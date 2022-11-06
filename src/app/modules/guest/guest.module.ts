import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuestRoutingModule } from './guest-routing.module';
import { LoginComponent } from './layouts/login/login.component';
import { PasswordResetComponent } from './layouts/password-reset/password-reset.component';
import { RegisterComponent } from './layouts/register/register.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule, GuestRoutingModule
  ],
  exports: [
  ]
})
export class GuestModule { }
