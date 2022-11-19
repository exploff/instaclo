import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  private userToAdd!: User;
  public message: string = '';
  private currentUser!: User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let uid = this.authenticationService.getUserUID();
    if (uid != null) {
      this.getCurrentUser();
      this.addUserAndRedirect()
    } else {
      this.router.navigate(['/login']);
    }
  }

  getCurrentUser() {
    if (this.route.snapshot.data['currentUser'] != undefined) {
      this.currentUser = this.route.snapshot.data['currentUser'][0];
    } else {
      this.router.navigate(['/login']);
    }
  }

  addUserAndRedirect() {
    let destinationRoute = '';
    if (this.route.snapshot.data['userToAdd'] != undefined) {
      if (this.route.snapshot.data['userToAdd'] instanceof Array) {
        this.userToAdd = this.route.snapshot.data['userToAdd'][0];
      } else {
        this.userToAdd = this.route.snapshot.data['userToAdd'];
      }
      if (this.userToAdd.uid == this.currentUser.uid) {
        destinationRoute = '/user/profil';
        this.message = 'Vous ne pouvez pas vous ajouter vous même';
      } else {
        let result = this.followUser();
        destinationRoute = '/user/profil/' + this.userToAdd.id;
        if (result) {
          this.message = 'Vous êtes maintenant ami avec ' + this.userToAdd.firstName + ' ' + this.userToAdd.lastName;
        } else {
          this.message = 'Vous suivez déjà cette personne';
        }
      }
    } else {
      destinationRoute = '/user/home';
      this.message = 'Utilisateur introuvable';
    }

    window.setTimeout(() => {
      this.router.navigate([destinationRoute]);
    }, 3000);
  }


  followUser(): boolean {
    console.log(this.currentUser.follows);
    console.log(this.userToAdd.id);
    if (!this.currentUser.follows.includes(this.userToAdd.id)) {
      this.userToAdd.followers.push(this.currentUser.id);
      this.userService.updateUser(this.userToAdd);
      this.currentUser.follows.push(this.userToAdd.id);
      this.userService.updateUser(this.currentUser);
      return true;
    } else {
      return false;
    }
  }
}
