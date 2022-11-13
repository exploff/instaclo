import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';

export interface DialogDataModel {
  userId: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-dialog-qr-code',
  templateUrl: './dialog-qr-code.component.html',
  styleUrls: ['./dialog-qr-code.component.scss']
})
export class DialogQrCodeComponent {

  public urlQrcode: string = '';

  public qrCodeDownloadLink: SafeUrl = '';
  public qrCodeDownloadTitle: string = 'QRCode_';

  constructor(
    public dialogRef: MatDialogRef<DialogQrCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel
  ) {
    this.urlQrcode = location.protocol + "//" + location.host + "/user/qrcode/" + data.userId;
    this.qrCodeDownloadTitle += data.firstName + '_' + data.lastName;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
