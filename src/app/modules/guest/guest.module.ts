import { NgModule } from "@angular/core";

import { GuestRoutingModule } from "./guest-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SharedModule } from "../../shared/shared.module";
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

@NgModule({
  declarations: [LoginComponent, NotFoundComponent, SignUpComponent, PasswordResetComponent],
  imports: [SharedModule, GuestRoutingModule],
})
export class GuestModule { }
