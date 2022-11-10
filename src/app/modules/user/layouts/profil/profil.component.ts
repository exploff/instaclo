import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public id!: string;
  public user: User | undefined;
  public bio = new FormControl('');
  public isUserCo = false;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(() => {
        this.getUser()
    });
  }

  ngOnInit(): void {
    try {
      this.getUser()
    } catch (error) {
      console.error(error);
      this.router.navigate(['/login']);
    }
  }

  public getUser() {
    let uid = this.authenticationService.getUserUID();
    if (uid != null) {
      if (this.route.snapshot.data['user'][0]['uid'] == uid) {
        this.isUserCo = true;
      }else{
        this.isUserCo = false;
      }
      this.user = this.route.snapshot.data['user'][0];
    } else {
      this.router.navigate(['/login']);
    }
  }

}
