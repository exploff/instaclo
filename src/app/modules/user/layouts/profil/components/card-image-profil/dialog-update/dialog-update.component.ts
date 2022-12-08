import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Image } from 'src/app/modules/user/models/image.model';
import { ImageService } from 'src/app/modules/user/services/image/image.service';

export interface DialogDataModel {
  image: Image;
  currentUser: User;
}

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss'],
})
export class DialogUpdateComponent {
  public image!: Image;
  public description = new FormControl('', [
    Validators.required,
    Validators.maxLength(150),
  ]);

  constructor(
    public userService: UserService,
    public imageService: ImageService,
    public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel
  ) {
    this.image = data.image;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.description.value != null && this.description.value != '') {
      this.image.description = this.description.value;
      this.imageService.updateImage(this.image);
      this.description.reset();
    }
  }
}
