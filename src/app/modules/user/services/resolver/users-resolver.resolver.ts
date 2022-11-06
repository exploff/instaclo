import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverResolver implements Resolve<User[]> {
  constructor(private userService: UserService, private router: ActivatedRoute) {
    console.log(this.router.);

    // this.router.params.subscribe(
    //   (params) => {
    //     console.log("my param : " + params);
    //   })
  }
  resolve(): Observable<User[]> {
    return this.userService.fetchAll();
  }
}
