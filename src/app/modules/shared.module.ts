import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest/guest.component';

@NgModule({
  declarations: [

    GuestComponent
  ],
  imports: [
    CommonModule,
  ],exports:[
    CommonModule
  ]
})
export class SharedModule { }
