import { Component, OnInit } from '@angular/core';

import {ChatService} from "../../services/chat/chat.service";
import {UserService} from "../../../../core/services/user/user.service";
import {AuthenticationService} from "../../../../core/services/authentification/authentification.service";
import {User} from "../../../../core/models/user.model";
import {ChatRoomService} from "../../services/chat-room/chat-room.service";
import {ChatRoom} from "../../models/chat-room.model";


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  private user!: User;
  public chatRoom: ChatRoom[] = [];
  public myUserFriend: User[] = [];
  constructor(private chatRoomService : ChatRoomService, private chatService : ChatService, private userService : UserService, private authService : AuthenticationService) { }


  async getChatRoom() {
    let uid = this.authService.getUserUID();
    if (uid ) {
      this.user = await this.userService.getCurrentUser(uid);
    }
    //TODO : need resolver fuck async await
    this.chatRoomService.fetchChatRoomByUserId(this.user.id).subscribe((chatRoom) => {
      this.chatRoom = chatRoom;
      this.chatRoom[0].users.forEach((item) => {
        console.log(item);
        this.getUserInChatRoom(item);
      })
    });
  }

  ngOnInit(): void {
    this.getChatRoom()
  }


  getUserInChatRoom(id: string) {
    this.userService.fetchUserById(id).subscribe((user) => {
      this.myUserFriend.push(user);
    })
  }

}
