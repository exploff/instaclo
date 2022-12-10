import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Image } from 'src/app/modules/user/models/image.model';

export interface DialogDataModel {
  image: Image;
}

@Component({
  selector: 'app-dialog-like',
  templateUrl: './dialog-like.component.html',
  styleUrls: ['./dialog-like.component.scss'],
})
export class DialogLikeComponent implements OnInit {
  public image!: Image;
  public user: User[] = [];

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogLikeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel
  ) {
    this.image = data.image;
  }

  ngOnInit() {
    this.image.like.forEach((id) => {
      this.userService.fetchUserById(id).subscribe((user) => {
        this.user.push(user);
        //push unique value to array
        this.user = this.user.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.id === thing.id)
        );
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
