import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public user: User | undefined;

  public bio = new FormControl('');
  public isEditable = false;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) {
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

}
