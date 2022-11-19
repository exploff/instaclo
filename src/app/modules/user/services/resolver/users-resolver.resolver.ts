import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, take, lastValueFrom, of, forkJoin} from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverResolver implements Resolve<User | undefined> {
  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
  }
  resolve(route: ActivatedRouteSnapshot):  Observable<User | undefined> {
    let id = route.paramMap.get('id');
    if (id != null) {
      return this.userService.fetchUserById(id);
    } else {
      return new Observable(undefined);
    }

  }
}

