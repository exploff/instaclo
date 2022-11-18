import { ImageService } from './../../services/image/image.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Image } from "../../models/image.model";
import { lastValueFrom, take } from 'rxjs';
import { ChatRoomService } from '../../services/chat-room/chat-room.service';
import { ChatRoom } from '../../models/chat-room.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogQrCodeComponent } from './components/dialog-qr-code/dialog-qr-code.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public id!: string;
  public isUserCo = false;
  public isUserFollowed = false;
  public user!: User;
  images!:Image[];
  public imageLength: number = 0;
  public errorMessage:string = '';
  public userUid;
  public userId!:string

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router,
    private route: ActivatedRoute, private imageService:ImageService, private chatRoomService: ChatRoomService,
    public dialog: MatDialog) {
    this.route.params.subscribe(() => {
      this.getUser()
    });
    this.userUid = this.authenticationService.getUserUID()!;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogQrCodeComponent, {
      width: '300px',
      data: {
        userId: this.userId,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.getUser()
    this.getCurrentUserid()
  }

  getUser() {
    let uid = this.authenticationService.getUserUID();

    if (uid != null) {
      if (this.route.snapshot.data['user'] != undefined) {
        if (this.route.snapshot.data['user'] instanceof Array) {
          this.user = this.route.snapshot.data['user'][0];
        } else {
          this.user = this.route.snapshot.data['user'];
        }
        this.getUserImages(this.user.id);
      } else {
        this.isUserCo = true;
        this.userService.fetchUserByUID(uid).subscribe((users: User[]) => {
          this.user = users[0];
          this.isUserFollowed = this.user.follows.includes(uid!) ? true : false;
          this.getUserImages(this.user.id);
        });
      }
    } else {
       this.router.navigate(['/login']);
    }
    this.isUserCo = this.user.uid == uid ? true : false;
    this.isUserFollowed = this.user.follows.includes(uid!) ? true : false;
  }

  getUserImages(id: string):void {
      this.imageService.fetchUserImages(id).subscribe((data:Image[])=>{
        this.images=data;
        this.imageLength = data.length;
      })
  }

  async onFollowUser(){
    let userUid = this.authenticationService.getUserUID();
    if (userUid) {
      //check if userID existe
      let currentUser = await this.userService.getCurrentUser(userUid)

      if(!this.user.followers.includes(currentUser.id)){
        //Follow users
        this.user.followers.push(currentUser.id);
        //update current user
        this.userService.updateUser(this.user);
        currentUser.follows.push(this.user.id);
        // update followed user
        this.userService.updateUser(currentUser);
      }else{
        //Unfollow users
        //update current user
        for( var i = 0; i < this.user.followers.length; i++){
          if ( this.user.followers[i] === currentUser.id) {
            this.user.followers.splice(i, 1);
          }
        }
        this.userService.updateUser(this.user);

        // update followed user
        for( var i = 0; i < currentUser.follows.length; i++){
          if (currentUser.follows[i] === this.user.id) {
            currentUser.follows.splice(i, 1);
          }
        }
        this.userService.updateUser(currentUser);
      }
    }
  }

  public sendChat(userId: string) {

    //Création de la chatroom avec la personne si elle n'exite pas et on redirige vers la chatroom
    if (userId != null) {
      let uid = this.authenticationService.getUserUID();
      if (uid != null) {
        this.userService.fetchUserByUID(uid).subscribe((users: User[]) => {
          let userConnected = users[0];
          this.chatRoomService.fetchChatRoomByUserUidFromORUserUidTo(uid!).subscribe((chatRooms) => {
            let chatRoomFound: ChatRoom | undefined;
            chatRooms.forEach((chatRoom) => {
              chatRoom.users.forEach((user) => {
                if (user.id == userId) {
                  chatRoomFound = chatRoom;
                }
              })
            })
            if (chatRoomFound == undefined) {
              //Ouvre chat room d'un seul côté car aucun message n'a encore été envoyé
              const chatRoom: ChatRoom = {
                id: '',
                uid_user: [this.user.uid, userConnected.uid],
                created_date: new Date().toTimeString(),
                users: [
                  this.user,
                  userConnected
                ],
              }
              this.chatRoomService.addNewChatRoom(chatRoom);
            }

            this.router.navigate(['/user/chat/' + userId]);
          });
        });
      } else {
        //TODO : Gestion erreur
        this.errorMessage = "Erreur lors de l'envoie d'un message";
      }
    } else {
      //TODO : Gestion erreur
      this.errorMessage = "Erreur lors de l'envoie d'un message";
    }
  }
   getCurrentUserid():void{
    let uid =this.authenticationService.getUserUID()
    if(uid){
       this.userService.getCurrentUser(uid).then(user => this.userId= user.id)
    }
  }
}
