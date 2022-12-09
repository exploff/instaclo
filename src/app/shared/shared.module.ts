import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../shared/material-design.module';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { QRCodeModule } from 'angularx-qrcode';
import { ClickOutsideMessageDirective } from './directive/click-outside-message.directive';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MaterialDesignModule,
  QRCodeModule,
  NgxScannerQrcodeModule
];

const PIPES: any = [];

const COMPONENTS = [...PIPES];

const DIRECTIVES: any = [ClickOutsideDirective, ClickOutsideMessageDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES],
  providers: [...PIPES],
})
export class SharedModule {}
