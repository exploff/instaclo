import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { Image } from 'src/app/modules/user/models/image.model';
import { Comment } from 'src/app/modules/user/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageService } from 'src/app/modules/user/services/image/image.service';

export interface DialogDataModel {
  image: Image;
  currentUser: User;
}

@Component({
  selector: 'app-dialog-comment',
  templateUrl: './dialog-comment.component.html',
  styleUrls: ['./dialog-comment.component.scss'],
})
export class DialogCommentComponent {
  public image!: Image;
  public currentUser!: User;
  public comments!: [];
  public comment = new FormControl('', [
    Validators.required,
    Validators.maxLength(150),
  ]);

  constructor(
    public userService: UserService,
    public imageService: ImageService,
    public dialogRef: MatDialogRef<DialogCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel
  ) {
    this.image = data.image;
    this.currentUser = data.currentUser;
  }

  compareComment(a: Comment, b: Comment) {
    if (a.createDate > b.createDate) {
      return -1;
    }
    if (a.createDate < b.createDate) {
      return 1;
    }
    return 0;
  }

  getUser(userId: string): Observable<User> {
    return this.userService.fetchUserById(userId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.comment.value != '') {
      let date = Date.now();
      let comment: Comment = {
        userId: this.currentUser.id,
        fullName: this.currentUser.firstName + ' ' + this.currentUser.lastName,
        comment: this.comment.value!,
        createDate: new Timestamp(date / 1000, date / 1000000),
      };
      this.image.comments.push(comment);
      this.imageService.updateImage(this.image);
      this.comment.reset();
    }
  }

  deleteComment(comment: Comment) {
    if (comment.userId === this.currentUser.id) {
      this.image.comments.splice(this.image.comments.indexOf(comment), 1);
      this.imageService.updateImage(this.image);
    }
  }
}
