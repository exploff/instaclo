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
  public isEditable = false;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    // let uid = this.authenticationService. getUserUID();
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

  public updateBio(): void {
    if (this.user != undefined) {
      this.user.bio = this.bio.value == null ? '' : this.bio.value;
      this.userService.updateUser(this.user);
    }
    this.isEditable = false;
  }

  public editBio(): void {
    this.isEditable = true;
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    try {
      let uid = this.authenticationService.getUserUID();
      if (uid != null) {
        this.userService.fetchUserByUID(uid).subscribe((users) => {
          this.user = users[0];
        });
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
      this.router.navigate(['/login']);
    }
  }

}
