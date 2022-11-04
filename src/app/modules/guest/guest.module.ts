import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuestRoutingModule } from './guest-routing.module';
import { LoginComponent } from './layouts/login/login.component';
import { PasswordResetComponent } from './layouts/password-reset/password-reset.component';
import { RegisterComponent } from './layouts/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent
  ],
  imports: [
    SharedModule, GuestRoutingModule
  ],
  exports: [
  ]
})
export class GuestModule { }
