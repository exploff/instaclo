import { lastValueFrom, take } from 'rxjs';
import { Image } from './../../../../models/image.model';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageService } from 'src/app/modules/user/services/image/image.service';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent implements OnInit, AfterViewInit {

  @Input()image!:Image;

  user!: User;

  likedImage!: string;

  @ViewChild('descriptionUser') description!: ElementRef;

  constructor(private userService:UserService, private imageService: ImageService) { }

  async ngOnInit(): Promise<void> {
    await this.getImageUser();
    this.likedImage = this.image.like.includes(this.user.id) ? 'red' : '';
  }

  async getImageUser() {
    this.user = await lastValueFrom(this.userService.fetchUserById(this.image.userID).pipe(take(1)));
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
    if (!this.image.like.includes(this.user.id)) {
      this.image.like.push(this.user.id);
      this.likedImage = 'red';
    } else {
      this.image.like.splice(this.image.like.indexOf(this.user.id), 1);
      this.likedImage = '';
    }
    this.imageService.updateImage(this.image);
  }
}
