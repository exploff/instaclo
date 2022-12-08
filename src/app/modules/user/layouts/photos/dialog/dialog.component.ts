import { Component, Inject, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogDataModel {
  message: string;
  type: "autorisation"|"compatibilite"
}

@Component({
  selector: 'app-dialog-comment',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public imagefield = new FormControl('', [Validators.required,]);
  public image!:File

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel,
     private router: Router
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close("Quitter")
  }
  onAutoriser():void{
    this.dialogRef.close("Autoriser")
  }
  onChoisir():void{
    if(this.image){
      this.dialogRef.close(this.image)
    }else{
      this.dialogRef.close("Quitter")
    }
  }
  onchange(event:any){
    this.image = event.target.files[0];
  }

}
