import { HomeResolverModel } from './../../layouts/home/models/HomeResolverModel';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { Image } from './../../models/image.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageService } from '../image/image.service';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverResolver implements Resolve<Promise<HomeResolverModel>> {
   constructor(private userService: UserService,private authenticationService:AuthenticationService,private router: Router, private imageService:ImageService ) {
  }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<HomeResolverModel> {

    let returnObjet!:HomeResolverModel
    let currentUser!:User
    let listFollowsImages!:Image[]
    let listFollowedUsers!:User[]
    let uid = this.authenticationService.getUserUID();


    if (uid) {
     currentUser = await this.userService.getCurrentUser(uid)
     listFollowsImages= await this.imageService.fetchUserfollowsImages(currentUser);
     listFollowedUsers= await this.userService.getFollowedUsers(currentUser)

     returnObjet={currentUser,listFollowsImages,listFollowedUsers}
    }else{
      this.router.navigate(['/login']);
    }
    return returnObjet
  }
}
