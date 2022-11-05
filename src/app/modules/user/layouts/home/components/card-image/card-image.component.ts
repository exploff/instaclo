import { lastValueFrom, take } from 'rxjs';
import { Image } from './../../../../models/image.model';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent implements OnInit {
  @Input()image!:Image
  user!: User
  constructor(private userService:UserService) { }

  async ngOnInit(): Promise<void> {
    await this.getImageUser()
  }

  async getImageUser(){
    this.user= await lastValueFrom(this.userService.fetchUserById(this.image.userID).pipe(take(1)))
  }
}
