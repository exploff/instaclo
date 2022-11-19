import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatRoom} from "../../models/chat-room.model";
import {ChatService} from "../../services/chat/chat.service";
import {Chat} from "../../models/chat.model";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../core/services/authentification/authentification.service";
import {UserService} from "../../../../core/services/user/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input()chatRoomsForComponentChat!: ChatRoom;
  @Input()messageRoom!: Observable<Chat[]>;
  @ViewChild('messageInput') inputName: any;

  public chat!: Chat;
  public message = new FormControl('', [Validators.required]);
  public uid!: string | null;
  public user!: User[];

  constructor(public chatService: ChatService, public route: ActivatedRoute, public authService: AuthenticationService, public userService: UserService) {
  }


  onSubmit() {
    if (this.message.value != '') {
      if (this.uid != null){
        if (this.user != null) {
          this.chat = {
            id: '',
            id_chat_room: this.chatRoomsForComponentChat.id,
            uid_user: this.uid,
            pseudo_user: this.user[0].pseudo,
            message: this.message.value ? this.message.value : '',
            date_created: new Date().toTimeString(),
          }
        }
        this.chatService.addNewChat(this.chat);
        this.message.setValue('');
      }
    }
  }


  ngOnInit(): void {
    this.uid = this.authService.getUserUID();
    if (this.uid  != null) {
      this.userService.fetchUserByUID(this.uid).subscribe((user: User[]) => {
        this.user = user;
      });
    }
  }


}

