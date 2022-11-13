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

  constructor(private authenticationService: AuthenticationService, private userService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getUser()
    });
  }

  async getUser() {
    let uid = this.authenticationService.getUserUID();
    let destinationRoute = '';
    if (uid != null) {
      if (this.route.snapshot.data['userToAdd'] != undefined) {
        if (this.route.snapshot.data['userToAdd'] instanceof Array) {
          this.userToAdd = this.route.snapshot.data['userToAdd'][0];
        } else {
          this.userToAdd = this.route.snapshot.data['userToAdd'];
        }
        if (this.userToAdd.uid == uid) {
          destinationRoute = '/user/profil';
          this.message = 'Vous ne pouvez pas vous ajouter vous même';
        } else {
          //Message avec vous allez etre redirigé et un compteur de 3 secondes avec raison
          console.log("ajout de l ami");
          let result = await this.followUser();
          destinationRoute = '/user/profil/' + this.userToAdd.id;;
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
    } else {
      destinationRoute = '/login';
      this.message = 'Vous devez être connecté pour accéder à cette page';
    }
    window.setTimeout(() => {
      this.router.navigate([destinationRoute]);
    }, 3000);
  }


  async followUser(): Promise<boolean> {
    let userUid = this.authenticationService.getUserUID();
    if (userUid) {
      let currentUser = await this.userService.getCurrentUser(userUid);
      if (!currentUser.follows.includes(this.userToAdd.id)) {

        this.userToAdd.followers.push(currentUser.id);
        this.userService.updateUser(this.userToAdd);

        currentUser.follows.push(this.userToAdd.id);
        this.userService.updateUser(currentUser);
        return true;
      }
    }
    return false;
  }
}
