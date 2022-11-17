import { ImageService } from './../../services/image/image.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Image } from "../../models/image.model";
import { lastValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public id!: string;
  public isUserCo = false;
  public user!: User;
  images!:Image[];
  public imageLength: number = 0;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute, private imageService:ImageService ) {
    this.route.params.subscribe(() => {
      this.getUser()
    });
  }

    ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    let uid = this.authenticationService.getUserUID();
    if (uid != null) {
      if (this.route.snapshot.data['user']['uid'] == uid) {
        this.isUserCo = true;
      }else{
        this.isUserCo = false;
      }
      console.log(this.route.snapshot.data['user']);
      this.user = this.route.snapshot.data['user'];
      this.getUserImages(this.user.id);
    } else {
       this.router.navigate(['/login']);
    }
  }

  getUserImages(id: string):void {
      this.imageService.fetchUserImages(id).subscribe((data:Image[])=>{
        this.images=data;
        this.imageLength = data.length;
      })
  }

  async onFollowUser(userID:string){
    //check if userID existe
    if(!this.user.follows.includes(userID)){
      this.user.follows.push(userID);
      //update current user
      this.userService.updateUser(this.user);
      let followedUser= await lastValueFrom(this.userService.fetchUserById(userID).pipe(take(1)))
      followedUser.followers.push(this.user.id);
      // update followed user
      this.userService.updateUser(followedUser);
    }else{
      // TODO : change error handeling et supprimer le follow
      throw new Error("User already followed")
    }
  }
}
