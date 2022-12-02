import { CardImageProfilComponent } from './components/card-image-profil/card-image-profil.component';
import { ImageService } from './../../services/image/image.service';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Image } from '../../models/image.model';
import { ChatRoomService } from '../../services/chat-room/chat-room.service';
import { ChatRoom } from '../../models/chat-room.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogQrCodeComponent } from './components/dialog-qr-code/dialog-qr-code.component';
import { Observable } from 'rxjs';
import { DialogCommentComponent } from '../home/components/card-image/dialog-comment/dialog-comment.component';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  public isUserCo = false;
  public user!: User;
  public images!: Observable<Image[]>;
  public errorMessage: string = '';
  public currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private chatRoomService: ChatRoomService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe(() => {
      this.getCurrentUser();
      this.getUser();
    });
  }

  getCurrentUser() {
    if (this.route.snapshot.data['currentUser'] != undefined) {
      this.currentUser = this.route.snapshot.data['currentUser'][0];
      console.log(this.currentUser);

    } else {
      this.router.navigate(['/login']);
    }
  }

  getUser() {
    if (this.route.snapshot.data['user'] != undefined) {
      this.user = this.route.snapshot.data['user'];
      this.getUserImages(this.user.id);
    } else {
      this.user = this.currentUser;
      this.getUserImages(this.currentUser.id);
    }
    this.isUserCo = this.user.id == this.currentUser.id;
  }

  getUserImages(id: any): void {
    this.images = this.imageService.fetchUserImages(id);
  }

  onFollowUser() {
    if (!this.user.followers.includes(this.currentUser.id)) {
      //Follow users
      this.user.followers.push(this.currentUser.id);
      //update current user
      this.userService.updateUser(this.user);
      this.currentUser.follows.push(this.user.id);
      // update followed user
      this.userService.updateUser(this.currentUser);
    } else {
      //Unfollow users
      //update current user
      for (var i = 0; i < this.user.followers.length; i++) {
        if (this.user.followers[i] === this.currentUser.id) {
          this.user.followers.splice(i, 1);
        }
      }
      this.userService.updateUser(this.user);

      // update followed user
      for (var i = 0; i < this.currentUser.follows.length; i++) {
        if (this.currentUser.follows[i] === this.user.id) {
          this.currentUser.follows.splice(i, 1);
        }
      }
      this.userService.updateUser(this.currentUser);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogQrCodeComponent, {
      width: '300px',
      data: {
        userId: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public sendChat(uid_user: string) {
    //Création de la chatroom avec la personne si elle n'exite pas et on redirige vers la chatroom
    if (uid_user != null) {
      this.chatRoomService
        .fetchChatRoomByUserUidFromORUserUidTo(this.currentUser.uid)
        .subscribe((chatRooms) => {
          let chatRoomFound: ChatRoom | undefined;
          chatRooms.forEach((chatRoom) => {
            chatRoom.uid_user.forEach((uid) => {
              if (uid == uid_user) {
                chatRoomFound = chatRoom;
              }
            });
          });
          if (chatRoomFound == undefined) {
            const chatRoom: ChatRoom = {
              id: '',
              uid_user: [this.user.uid, this.currentUser.uid],
              created_date: new Date().toTimeString(),
              user: [],
            };
            this.chatRoomService.addNewChatRoom(chatRoom);
          }
          this.router.navigate(['/user/chat/' + uid_user]);
        });
    } else {
      //TODO : Gestion erreur
      this.errorMessage = "Erreur lors de l'envoie d'un message";
    }
  }

}
