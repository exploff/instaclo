import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ChatRoom } from "../../models/chat-room.model";
import { ChatService } from "../../services/chat/chat.service";
import { Chat } from "../../models/chat.model";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../../core/services/authentification/authentification.service";
import { UserService } from "../../../../core/services/user/user.service";
import { SwipeEvent } from 'ng-swipe';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chatRoomsForComponentChat!: ChatRoom;
  @Input() messageRoom!: Observable<Chat[]>;
  @ViewChild('messageInput') inputName: any;
  @ViewChild('newMessage') newMessage: ElementRef;
  newMessageUpdate: string = "";

  public isTrue : boolean = false;
  public chat!: Chat;
  public message = new FormControl('', [Validators.required]);
  public uid!: string | null;
  public user!: User[];
  public displayDate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public TEST!: Boolean;
  constructor(public chatService: ChatService, public route: ActivatedRoute, public authService: AuthenticationService, public userService: UserService, newMessage: ElementRef) {
    this.displayDate.subscribe(valeur => {
      this.TEST = valeur;
    });
    this.newMessage = newMessage;
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
          }
        }
        this.chatService.addNewChat(this.chat);
        this.message.setValue('');
      }
    }
  }

  ngOnInit(): void {
    console.log(this.chatRoomsForComponentChat);

    this.uid = this.authService.getUserUID();
    if (this.uid != null) {
      this.userService.fetchUserByUID(this.uid).subscribe((user: User[]) => {
        this.user = user;
      });
    }
  }

  doubleclick(){
    this.isTrue = true;
    //this.chatService.deleteChat()

  }


  delete(id : string) {
    this.chatService.deleteChat(id);
  }

  update(chat : Chat) {
    this.newMessageUpdate = this.newMessage.nativeElement.value;
    chat.message = this.newMessageUpdate;
    this.chatService.updateChat(chat);
    this.isTrue = false;

  }


  onSwipeMove(event: SwipeEvent) {
    // if (event.distance < 0) {
    //   this.displayDate.next(true);
    // } else {
    //   this.displayDate.next(false);
    // }
  }

  onSwipeEnd(event: SwipeEvent) {
    if (event.distance < 0) {
      this.displayDate.next(true);
    } else {
      this.displayDate.next(false);
    }
  }
}

