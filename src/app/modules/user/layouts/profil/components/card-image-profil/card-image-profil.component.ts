import { Image } from './../../../../models/image.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageService } from 'src/app/modules/user/services/image/image.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommentComponent } from '../../../home/components/card-image/dialog-comment/dialog-comment.component';


@Component({
  selector: 'app-card-image-profil',
  templateUrl: './card-image-profil.component.html',
  styleUrls: ['./card-image-profil.component.scss'],
})
export class CardImageProfilComponent implements OnInit, AfterViewInit {
  @Input() image!: Image;

  @Input() currentUser!: User;

  user!: Observable<User>;

  likedImage!: string;

  isEditableDescription: boolean = false;

  @ViewChild('descriptionUser') description!: ElementRef;

  @ViewChild('moreDescription') moreDescription!: ElementRef;


  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = this.userService.fetchUserById(this.image.userID);
    this.likedImage = this.image.like.includes(this.currentUser.id)
      ? 'red'
      : '';
  }

  ngAfterViewInit() {
    var max = 50;
    if (this.description.nativeElement.innerHTML.length > max) {
      this.description.nativeElement.innerHTML = (
        this.description.nativeElement.innerHTML.substring(0, max) + ' ... ').replace(/<[^>]*>?/gm, '');
    } else {
      this.moreDescription.nativeElement.remove();
    }
  }

  public displayDescription() {
    this.description.nativeElement.innerHTML = this.image.description;
    this.moreDescription.nativeElement.remove();
    this.isEditableDescription = true;
  }

  public like() {
    if (!this.image.like.includes(this.currentUser.id)) {
      this.image.like.push(this.currentUser.id);
      this.likedImage = 'red';
    } else {
      this.image.like.splice(this.image.like.indexOf(this.currentUser.id), 1);
      this.likedImage = '';
    }
    this.imageService.updateImage(this.image);
  }


  delete(id: string) {
    this.imageService.deleteImage(id);
  }

  saveEdit() {
    if (this.isEditableDescription) {
      this.image.description = (this.description.nativeElement.innerHTML).replace(/<[^>]*>?/gm, '');
      this.imageService.updateImage(this.image);
    } else {
      this.description.nativeElement.innerHTML = this.image.description;
      this.isEditableDescription = true;
      this.moreDescription.nativeElement.remove();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCommentComponent, {
      panelClass: 'custom-dialog-comment-container',
      data: {
        image: this.image,
        currentUser: this.currentUser,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
