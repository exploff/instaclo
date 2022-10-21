import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'guest', loadChildren: () => import('./modules/guest/guest/guest.module').then(m => m.GuestModule) }, { path: 'guest', loadChildren: () => import('./modules/guest/guest.module').then(m => m.GuestModule) }, { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
