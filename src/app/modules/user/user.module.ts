import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { ProfilComponent } from './layouts/profil/profil.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ProfilComponent, EditProfilComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule { }
//TODO guest module
