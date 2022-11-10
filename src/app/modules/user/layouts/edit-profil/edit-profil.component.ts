import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit {
  public user: User | undefined;

  public bio = new FormControl('');
  public firstname = new FormControl('');
  public lastname = new FormControl('');
  public pseudo = new FormControl('');

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  public onSubmit(): void {
    if (this.user != undefined) {
      this.user.firstName =
        this.firstname.value == null ? '' : this.firstname.value;
      this.user.lastName =
        this.lastname.value == null ? '' : this.lastname.value;
      this.user.pseudo = this.pseudo.value == null ? '' : this.pseudo.value;
      this.user.bio = this.bio.value == null ? '' : this.bio.value;
      this.userService.updateUser(this.user);
      this.router.navigate(['/user/profil/' + this.user.id]);
    }
  }

  ngOnInit(): void {
    try {
      let uid = this.authenticationService.getUserUID();
      if (uid != null) {
        this.userService.fetchUserByUID(uid).subscribe((users) => {
          this.user = users[0];
          this.bio.setValue(this.user.bio);
          this.firstname.setValue(this.user.firstName);
          this.lastname.setValue(this.user.lastName);
          this.pseudo.setValue(this.user.pseudo);
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
