import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverResolver implements Resolve<User> {
  constructor(private userService: UserService) {
  }
  resolve(route: ActivatedRouteSnapshot):  Observable<User> {
    let id = route.paramMap.get('id');
    if (id != null) {
      return this.userService.fetchUserById(id);
    }else{
      return new Observable<User>();
      // return this.userService.fetchAll();
    }
  }
}
