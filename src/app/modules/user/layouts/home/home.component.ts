import { Image } from './../../models/image.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { User } from 'src/app/core/models/user.model';
import { ImageService } from '../../services/image/image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private uid!: string | null;
  public user!: User;

  public listImages!: Observable<Image[]>;

  constructor(private authenticationService: AuthenticationService, private imageService: ImageService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadImages();
  }

  getCurrentUser() {
    if (this.route.snapshot.data['currentUser'] != undefined) {
      this.user = this.route.snapshot.data['currentUser'][0];
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadImages() {
    let usersId = this.user.follows;
    //Parcequ'on veut voir également nos posts
    usersId.push(this.user.id);
    this.listImages = this.imageService.fetchUsersImages(usersId);
  }

}
