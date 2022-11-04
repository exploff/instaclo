import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user!: User;
  public testArray: any[] = [];
  public pseudo = new FormControl('');
  public bUser: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) { }

  search($event: any) {
    let q = $event.target.value;
    if (q == "") {
      this.bUser = false;
    } else {
      if (this.pseudo?.value !== null) {
        this.searchByPseudo(this.pseudo?.value);
      }
    }

  }

  public searchByPseudo(pseudo: string) {
    this.userService.fetchUserByPseudo(pseudo).subscribe((users) => {
      this.testArray = [];
      users.forEach(user => {
        this.testArray.push(user)
      });
      if (this.testArray[0]) {
        // this.user = testArray;
        this.bUser = true;
      } else {
        this.bUser = false;
      }
    });
  }

  public async signOut() {
    try {
      await this.authenticationService.signOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }
  }
}
