import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ChatService } from '../../services/chat/chat.service';
import { UserService } from '../../../../core/services/user/user.service';
import { AuthenticationService } from '../../../../core/services/authentification/authentification.service';
import { User } from '../../../../core/models/user.model';
import { ChatRoomService } from '../../services/chat-room/chat-room.service';
import { ChatRoom } from '../../models/chat-room.model';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../../models/chat.model';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  @ViewChild(ChatComponent, {static: false}) childRef!: ChatComponent;

  public chatRooms!: ChatRoom[];
  public chatRoomsForComponentChat!: ChatRoom;
  public messagesRoom!: Observable<Chat[]>;
  public uid: string | null = '';
  public userToChat: any[] = [];
  status: boolean = false;

  public chatRoomUnread$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);


  constructor(
    private route: ActivatedRoute,
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
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((user: User[]) => {
              chatRoom.user = user;
            });
        }
      }
    });
  }

  ngAfterViewInit() {
    //Récupération des chats non lus
    if (this.uid) {
      this.chatService.checkNewMessage(this.uid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(chats => {
        if (chats.length > 0) {
          this.chatRoomUnread$.next(chats.map(chat => chat.id_chat_room));
        } else {
          this.chatRoomUnread$.next([]);
        }
      })
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  destroyChild() {
    if (this.childRef) {
      this.childRef.ngOnDestroy();
      this.childRef.ngOnInit();
    }
  }

  openChat(chatRoom: ChatRoom) {
    this.chatRoomsForComponentChat = chatRoom;
    this.status = !this.status;
    this.messagesRoom = this.chatService.fetchChatByChatRoomIdInOrder(
      this.chatRoomsForComponentChat.id
    );
    this.destroyChild();
  }

  clickEvent() {
    this.status = !this.status;
  }
}
