import { Component, OnInit } from '@angular/core';

import {ChatService} from "../../services/chat/chat.service";
import {UserService} from "../../../../core/services/user/user.service";
import {AuthenticationService} from "../../../../core/services/authentification/authentification.service";
import {User} from "../../../../core/models/user.model";
import {ChatRoomService} from "../../services/chat-room/chat-room.service";
import {ChatRoom} from "../../models/chat-room.model";
import {ActivatedRoute} from "@angular/router";
import {Chat} from "../../models/chat.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})

export class ChatListComponent implements OnInit {

  public chatRooms: ChatRoom[] = [];
  public chatRoomsForComponentChat!: ChatRoom;
  public messageRoom!: Chat[];
  public uid: string | null = '';

  constructor(private route : ActivatedRoute, private chatRoomService: ChatRoomService, private chatService: ChatService, private userService: UserService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.chatRooms = this.route.snapshot.data['chatRooms'];
    this.uid = this.authService.getUserUID();
  }


  openChat(chatId: string) {

    this.messageRoom = [];
    this.userService.fetchUserById(chatId).subscribe((user: User) => {
      console.log(user);
      for (let i = 0; i < this.chatRooms.length; i++) {
        for (let j = 0; j < this.chatRooms[i].users.length; j++) {
          if (this.chatRooms[i].uid_user[j] === user.uid) {
            this.chatRoomsForComponentChat = this.chatRooms[i];
            this.chatService.fetchChatByChatRoomIdInOrder(this.chatRoomsForComponentChat.id).subscribe((data) => {
              this.messageRoom = data;
            });
          }
        }
      }
    });
  }

}
