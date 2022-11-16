import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatRoom} from "../../models/chat-room.model";
import {ChatService} from "../../services/chat/chat.service";
import {Chat} from "../../models/chat.model";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../core/services/authentification/authentification.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input()chatRoomsForComponentChat!: ChatRoom;
  @Input()messageRoom!: Chat[];

  public chat!: Chat;
  public message = new FormControl('', [Validators.required]);

  constructor(public chatService: ChatService, public route: ActivatedRoute, public authService: AuthenticationService) {
  }


  onSubmit() {

    //if room does not exist for user

    //get ton id
    //je regarde si la chatroom existe chez topi avec ton id
    // si ça ecxiste je fait rien
    //sinon je creer la room


    if (this.message.value != '') {
      this.authService.getUserUID();
      let uid = this.authService.getUserUID();
      if (uid != null){
        this.chat = {
          id: '',
          id_chat_room: this.chatRoomsForComponentChat.id,
          uid_user: uid,
          message: this.message.value ? this.message.value : '',
          date_created: new Date().toTimeString(),
        }
        this.chatService.addNewChat(this.chat);
      }
    }
  }


  ngOnInit(): void {
    // console.log(this.chatRoomsForComponentChat)
    // this.chatService.fetchChatByChatRoomId(this.chatRoomsForComponentChat.id).subscribe((data) => {
    //   console.log(data);
    //   // this.chatService.addMessage(this.chat.id, this.message.value);
    // });
    // this.getMessages();
    // console.log(this.messageRoom)
  }


}

