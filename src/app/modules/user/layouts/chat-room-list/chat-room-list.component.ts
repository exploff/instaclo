import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat-room.service';
import { MessageChatService } from '../../services/message/message-chat.service';
import { User } from 'src/app/core/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';


@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss']
})
export class ChatRoomListComponent {

  user !: User;
  messageForm = new FormGroup(
    {
      message: new FormControl('', [Validators.required])
    }
  );

  constructor(private serviceChat : ChatService, private messageService : MessageChatService, private authService : AuthenticationService) { }


  onSubmit(){
    this.sendMessage(this.messageForm);
  }

  sendMessage(group : FormGroup){
    alert(group.controls['email'].value)

  }

}
