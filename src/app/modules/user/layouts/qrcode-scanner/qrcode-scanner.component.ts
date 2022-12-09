import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxScannerQrcodeService } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qrcode-scanner',
  templateUrl: './qrcode-scanner.component.html',
  styleUrls: ['./qrcode-scanner.component.scss']
})
export class QrcodeScannerComponent {

  public link!: string;

  constructor(private qrcode: NgxScannerQrcodeService, private router:Router) { }



  onQrCodeScan(response: string): void {
    if (response != null) {
      window.location.href = response;
    }
  }
}
