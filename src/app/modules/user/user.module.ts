import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent
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
