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

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute, private imageService:ImageService ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') !== "") {
        let id = params.get('id');
        if (id != null) {
          this.userService.fetchUserById(id).subscribe((users) => {
            this.user = users[0];
          });
        }
      }
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getCurrentUser()
    this.authentification()
    this.getUserImages()
  }

  private authentification():void{
    try {
      let uid = this.authenticationService.getUserUID();
      if (uid != null) {
        this.userService.fetchUserByUID(uid).subscribe((users) => {
          this.user = users[0];
          this.bio.setValue(this.user.bio);
        });
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
      this.router.navigate(['/login']);
    }
  }

  getUserImages():void {
      this.imageService.fetchUserImages(this.user.id).subscribe((data:Image[])=>{
        this.images=data
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

  async getCurrentUser():Promise<void>{
    let uid =this.authenticationService.getUserUID()
    if(uid){
      this.user= await this.userService.getCurrentUser(uid)
    }
  }
}
