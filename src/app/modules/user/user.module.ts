import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilComponent } from './layouts/profil/profil.component';


import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    ProfilComponent
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
