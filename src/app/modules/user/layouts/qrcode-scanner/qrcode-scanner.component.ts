import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qrcode-scanner',
  templateUrl: './qrcode-scanner.component.html',
  styleUrls: ['./qrcode-scanner.component.scss']
})
export class QrcodeScannerComponent implements AfterViewInit {

  public link!: string;

  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;

  constructor() { }

  onQrCodeScan(response: string): void {
    if (response != null) {
      window.location.href = response;
    }
  }

  ngAfterViewInit() {
    this.scanner.start();
  }
}
