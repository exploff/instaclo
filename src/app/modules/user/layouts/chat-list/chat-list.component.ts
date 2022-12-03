import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ChatService } from '../../services/chat/chat.service';
import { UserService } from '../../../../core/services/user/user.service';
import { AuthenticationService } from '../../../../core/services/authentification/authentification.service';
import { User } from '../../../../core/models/user.model';
import { ChatRoomService } from '../../services/chat-room/chat-room.service';
import { ChatRoom } from '../../models/chat-room.model';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../../models/chat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  public chatRooms!: ChatRoom[];
  public chatRoomsForComponentChat!: ChatRoom;
  public messagesRoom!: Observable<Chat[]>;
  public uid: string | null = '';
  public userToChat: any[] = [];
  status: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private chatRoomService: ChatRoomService,
    private chatService: ChatService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {

    this.chatRooms = this.route.snapshot.data['chatRooms'];
    this.uid = this.authService.getUserUID();

    this.chatRooms.forEach((chatRoom) => {
      for (let i = 0; i < chatRoom.uid_user.length; i++) {
        if (chatRoom.uid_user[i] != this.uid) {
          this.userService
            .fetchUserByUID(chatRoom.uid_user[i] as any)
            .subscribe((user: User[]) => {
              chatRoom.user = user;
            });
        }
      }
    });
  }

  openChat(chatRoom: ChatRoom) {
    this.chatRoomsForComponentChat = chatRoom;
    this.status = !this.status;
    this.messagesRoom = this.chatService.fetchChatByChatRoomIdInOrder(
      this.chatRoomsForComponentChat.id
    );
  }

  clickEvent() {
    this.status = !this.status;
  }
}
