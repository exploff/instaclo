import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./layouts/login/login.component";
import { PasswordResetComponent } from "./layouts/password-reset/password-reset.component";
import { RegisterComponent } from "./layouts/register/register.component";
NotFoundComponent

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "password-reset",
        component: PasswordResetComponent,
      },
      // { path: '**', component: NotFoundComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule { }
