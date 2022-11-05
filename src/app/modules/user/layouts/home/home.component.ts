import { lastValueFrom, map } from 'rxjs';
import { Image } from './../../models/image.model';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user!: User;
  listFollowsImages!:Image[]
  constructor(private authenticationService: AuthenticationService,private userService: UserService,private imageService:ImageService) { }

  async ngOnInit() {
    await this.getCurrentUser()
    await this.getlistFollowsImages()
  }

  async getlistFollowsImages(){
    this.listFollowsImages=await this.imageService.fetchUserfollowsImages(this.user)
  }
  async getCurrentUser():Promise<void>{
    let uid =this.authenticationService.getUserUID()
    if(uid){
      this.user= await this.userService.getCurrentUser(uid)
    }
  }
}
