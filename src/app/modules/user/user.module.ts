import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent
  ],
  imports: [
    UserRoutingModule,
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
//TODO guest module
