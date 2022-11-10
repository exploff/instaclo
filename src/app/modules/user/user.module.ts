import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { CardImageComponent } from './layouts/home/components/card-image/card-image.component';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';

import { UserRoutingModule } from './user-routing.module';
import { NotFoundUserComponent } from './layouts/not-found-user/not-found-user.component';

@NgModule({
  declarations: [ProfilComponent, EditProfilComponent,HomeComponent,CardImageComponent, NotFoundUserComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule {}
//TODO guest module
