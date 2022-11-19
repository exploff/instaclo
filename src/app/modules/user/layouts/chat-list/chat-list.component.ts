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

  public chatRooms!: ChatRoom[];
  public chatRoomsForComponentChat!: ChatRoom;
  public messagesRoom!: Observable<Chat[]>;
  public uid: string | null = '';

  constructor(private route : ActivatedRoute, private chatRoomService: ChatRoomService, private chatService: ChatService, private userService: UserService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.chatRooms = this.route.snapshot.data['chatRooms'];
    this.uid = this.authService.getUserUID();
  }


  openChat(chatRoom: ChatRoom) {
    let userToChat: User = chatRoom.users[0].uid == this.uid ? chatRoom.users[0] : chatRoom.users[1];
    console.log(userToChat);
    this.chatRoomsForComponentChat = chatRoom;
    this.messagesRoom = this.chatService.fetchChatByChatRoomIdInOrder(this.chatRoomsForComponentChat.id);
  }

}
