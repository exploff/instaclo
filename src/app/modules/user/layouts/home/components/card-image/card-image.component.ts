import { lastValueFrom, take } from 'rxjs';
import { Image } from './../../../../models/image.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageService } from 'src/app/modules/user/services/image/image.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent implements OnInit, AfterViewInit {

  @Input()image!:Image;

  user!: Observable<User>;

  likedImage!: string;

  @ViewChild('descriptionUser') description!: ElementRef;

  constructor(private userService:UserService, private imageService: ImageService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.userService.fetchUserById(this.image.userID);
    this.user.subscribe((user: User) => {
      this.likedImage = this.image.like.includes(user.id) ? 'red' : '';
    })
  }

  ngAfterViewInit() {
    var max = 50;
    if (this.description.nativeElement.innerHTML.length > max) {
      this.description.nativeElement.innerHTML = this.description.nativeElement.innerHTML.substring(0, max) + ' ... ';
      let href = document.createElement('a');
      href.textContent = 'lire la suite';
      href.classList.add('more-description');
      href.addEventListener('click', () => {
        this.description.nativeElement.innerHTML = this.image.description;
      });
      this.description.nativeElement.append(href);
    }
  }

  public like() {
    this.user.subscribe((user: User) => {
      if (!this.image.like.includes(user.id)) {
        this.image.like.push(user.id);
        this.likedImage = 'red';
      } else {
        this.image.like.splice(this.image.like.indexOf(user.id), 1);
        this.likedImage = '';
      }
      this.imageService.updateImage(this.image);
    })

  }
}
