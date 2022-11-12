import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input()chatWithUser!: User;

  constructor() { }

}
