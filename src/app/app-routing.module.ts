import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { NotFoundUserComponent } from './shared/components/not-found/not-found-user.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToUsers = () => redirectLoggedInTo(["user"]);

const routes: Routes = [
  {
  component: GuestLayoutComponent,
  path: "",
  loadChildren: () => import("./modules/guest/guest.module").then((module) => module.GuestModule),
  ...canActivate(redirectLoggedInToUsers),
},
{
  component: UserLayoutComponent,
  path: "user",
  loadChildren: () => import("./modules/user/user.module").then((module) => module.UserModule),
  ...canActivate(redirectUnauthorizedToLogin),
},
{
  path: '**',
  component : NotFoundUserComponent,
  pathMatch: 'full',
},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
