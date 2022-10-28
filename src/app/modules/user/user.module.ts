import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';


import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
  exports: [
  ]
})
export class UserModule { }
//TODO guest module
