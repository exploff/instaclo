import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<User[]> {
  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    let uid = this.authenticationService.getUserUID();
    return this.userService.fetchUserByUID(uid!);
  }
}
