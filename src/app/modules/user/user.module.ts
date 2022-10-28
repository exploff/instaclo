import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';


import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
//TODO guest module
