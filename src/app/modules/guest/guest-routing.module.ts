import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";


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
      // {
      //   path: "sign-up",
      //   //component: SignUpComponent,
      // },
      // {
      //   path: "not-found",
      //   //component: NotFoundComponent,
      // },
      // {
      //   path: "password-reset",
      //   //component: PasswordResetComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule { }
