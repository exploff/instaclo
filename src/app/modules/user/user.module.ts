import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { CardImageComponent } from './layouts/home/components/card-image/card-image.component';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';

import { UserRoutingModule } from './user-routing.module';
import { ChatListComponent } from './layouts/chat-list/chat-list.component';
import {ChatComponent} from "./layouts/chat/chat.component";

@NgModule({
  declarations: [ProfilComponent, EditProfilComponent, HomeComponent, CardImageComponent, ChatListComponent, ChatComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule { }
//TODO guest module
