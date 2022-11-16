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
  public chatWithUser: User | undefined;
  public messageRoom!: Chat[];

  constructor(private route : ActivatedRoute, private chatRoomService: ChatRoomService, private chatService: ChatService, private userService: UserService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.chatRooms = this.route.snapshot.data['chatRooms'];
    // this.chatWithUser = this.route.snapshot.data['chatWithUser'] instanceof Array ? this.route.snapshot.data['chatWithUser'][0]
    //                                                                               : this.route.snapshot.data['chatWithUser'];
  }

  openChat(chatId: string) {

    this.userService.fetchUserById(chatId).subscribe((user: User) => {
      this.chatWithUser = user;
      for (let i = 0; i < this.chatRooms.length; i++) {
          if(this.chatRooms[i].user_uid_to === user.uid) {
            this.chatRoomsForComponentChat = this.chatRooms[i];

            this.chatService.fetchChatByChatRoomId(this.chatRoomsForComponentChat.id).subscribe((data) => {
              this.messageRoom = data;
              console.log(data)
            });
            console.log(this.chatRoomsForComponentChat)
        }
      }
    });
  }

}
