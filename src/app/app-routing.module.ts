import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { UserComponent } from './modules/user/user.component';
import { GuestComponent } from './modules/guest/guest.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToUsers = () => redirectLoggedInTo(["user"]);

const routes: Routes = [
{
component: GuestComponent,
path: "",
loadChildren: () => import("./modules/guest/guest.module").then((module) => module.GuestModule),
...canActivate(redirectLoggedInToUsers),
},
{
component: UserComponent,
path: "user",
loadChildren: () => import("./modules/user/user.module").then((module) => module.UserModule),
...canActivate(redirectUnauthorizedToLogin),
},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
