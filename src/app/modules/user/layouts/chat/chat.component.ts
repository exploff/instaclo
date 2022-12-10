import { NotificationsService } from './../../services/notifications/notifications.service';
import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FormControl, Validators } from '@angular/forms';
import { ChatRoom } from '../../models/chat-room.model';
import { ChatService } from '../../services/chat/chat.service';
import { Chat } from '../../models/chat.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentification/authentification.service';
import { UserService } from '../../../../core/services/user/user.service';
import { BehaviorSubject } from 'rxjs';
import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() chatRoomsForComponentChat!: ChatRoom;
  @Input() messageRoom!: Observable<Chat[]>;
  @ViewChild('messageInput') inputName: any;

  private ngUnsubscribe = new Subject<void>();

  public toggle: boolean = false;
  public chat!: Chat;
  public message = new FormControl('', [Validators.required]);
  public uid!: string | null;
  public user!: User;
  public displayDate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public showDate!: Boolean;
  public message_id: string = '';

  constructor(
    public chatService: ChatService,
    public route: ActivatedRoute,
    public authService: AuthenticationService,
    public userService: UserService,
    private router: Router
  ) {
    this.displayDate.subscribe((valeur) => {
      this.showDate = valeur;
    });
  }

  onSubmit() {
    if (this.message.value != '') {
      if (this.uid != null) {
        if (this.user != null) {
          let toUserUid = this.chatRoomsForComponentChat.user[0].uid == this.uid ?
                            this.chatRoomsForComponentChat.user[1].uid : this.chatRoomsForComponentChat.user[0].uid;
          this.chat = {
            id: '',
            id_chat_room: this.chatRoomsForComponentChat.id,
            uid_user: this.uid,
            message: this.message.value ? this.message.value : '',
            date_created: new Date().toISOString(),
            toUserUid: toUserUid,
            read: "false"
          };
        }
        this.chatService.addNewChat(this.chat);
        this.message.setValue('');
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.uid = this.authService.getUserUID();

    this.messageRoom
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((chats: Chat[]) => {
      if (chats.length > 0) {
        for (let i = 0; i < chats.length; i++) {
          if (chats[i].toUserUid == this.uid && chats[i].read == "false") {
            chats[i].read = "true";
            this.chatService.updateChat(chats[i]);
          }
        }
      }
    });
  }

  getCurrentUser() {
    if (this.route.snapshot.data['currentUser'] != undefined) {
      this.user = this.route.snapshot.data['currentUser'][0];
    } else {
      this.router.navigate(['/login']);
    }
  }

  delete(id: string) {
    this.chatService.deleteChat(id);
  }

  update(chat: Chat, test: any) {
    chat.message = test;
    this.chatService.updateChat(chat);
    this.toggle = false;
  }

  handleChange() {
    this.toggle = false;
  }

  onSwipeRight() {
    this.displayDate.next(false);
  }

  onSwipeLeft2(messageId: string) {
    this.toggle = true;
    this.message_id = messageId;
  }

  onSwipeRight2() {
    this.toggle = false;
  }

  onSwipeLeft() {
    this.displayDate.next(true);
  }

}
