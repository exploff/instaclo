import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FormControl, Validators } from '@angular/forms';
import { ChatRoom } from '../../models/chat-room.model';
import { ChatService } from '../../services/chat/chat.service';
import { Chat } from '../../models/chat.model';
import { Observable } from 'rxjs';
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
export class ChatComponent implements OnInit  {
  @Input() chatRoomsForComponentChat!: ChatRoom;
  @Input() messageRoom!: Observable<Chat[]>;
  @ViewChild('messageInput') inputName: any;

  public toggle: boolean = false;
  public chat!: Chat;
  public message = new FormControl('', [Validators.required]);
  public uid!: string | null;
  public user!: User[];
  public displayDate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public showDate!: Boolean;
  public message_id: string = '';

  constructor(
    public chatService: ChatService,
    public route: ActivatedRoute,
    public authService: AuthenticationService,
    public userService: UserService
  ) {
    this.displayDate.subscribe((valeur) => {
      this.showDate = valeur;
    });
  }

  onSubmit() {
    if (this.message.value != '') {
      if (this.uid != null) {
        if (this.user != null) {
          this.chat = {
            id: '',
            id_chat_room: this.chatRoomsForComponentChat.id,
            uid_user: this.uid,
            message: this.message.value ? this.message.value : '',
            date_created: new Date().toISOString(),
          };
        }
        this.chatService.addNewChat(this.chat);
        this.message.setValue('');
      }
    }
  }


  ngOnInit(): void {

    this.uid = this.authService.getUserUID();
    if (this.uid != null) {
      this.userService.fetchUserByUID(this.uid).subscribe((user: User[]) => {
        this.user = user;
      });
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
