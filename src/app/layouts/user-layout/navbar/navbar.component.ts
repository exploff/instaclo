import { ChatService } from './../../../modules/user/services/chat/chat.service';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Chat } from 'src/app/modules/user/models/chat.model';
import { NotificationsService } from 'src/app/modules/user/services/notifications/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: User;
  public userArray: any[] = [];
  public pseudo = new FormControl('');
  public bUser: boolean = false;
  public focus: boolean = false;
  public newMessage: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private notificationsService: NotificationsService
  ) {
  }

  handleChange() {
    this.focus = true;
  }

  onFocus() {
    this.focus = false;
  }

  search($event: any) {
    this.focus = false;
    let q = $event.target.value;
    if (q == "") {
      this.bUser = false;
    } else {
      if (this.pseudo?.value !== null) {
        this.searchByPseudo(this.pseudo?.value);
      }
    }
  }

  public searchByPseudo(pseudo: string) {
    this.userService.fetchUserByKeywords(pseudo).subscribe((users) => {
      this.userArray = [];
      users.forEach(user => {
        this.userArray.push(user)
      });
      if (this.userArray[0]) {
        this.bUser = true;
      } else {
        this.bUser = false;
      }
    });
  }

  public async signOut() {
    try {
      await this.authenticationService.signOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {

    let uid = this.authenticationService.getUserUID();
    try {
      if (uid != null) {
        this.userService.fetchUserByUID(uid).subscribe((user) => {
          this.user = user[0];
          this.checkNewMessage();
        });
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
      this.router.navigate(['/login']);
    }
  }

  checkNewMessage() {
    this.chatService.checkNewMessage(this.user.uid).subscribe((data) => {
      if (data.length > 0) {
        this.newMessage = true;
        data.forEach((chat: Chat) => {
          this.sendNotification(chat.uid_user, chat.message);
        });
      }
    });
  }

  sendNotification(uidUser: string, message: string ) {
    this.userService.fetchUserByUID(uidUser).subscribe((users) => {
      if (users.length == 1) {
        this.notificationsService.generateNotification("Nouveau message de " + users[0].pseudo, message);
      }
    });
  }
}


