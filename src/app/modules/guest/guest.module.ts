import { NgModule } from '@angular/core';
import { LoginComponent } from './layouts/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { GuestRoutingModule } from './guest-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule, GuestRoutingModule
  ],
  exports: [
  ]
})
export class GuestModule { }
