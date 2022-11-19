import { NgModule }             from '@angular/core';

import { SharedModule }         from 'src/app/shared/shared.module';

import { UserRoutingModule }    from './user-routing.module';

import { EditProfilComponent }    from './layouts/edit-profil/edit-profil.component';
import { CardImageComponent }     from './layouts/home/components/card-image/card-image.component';
import { HomeComponent }          from './layouts/home/home.component';
import { ProfilComponent }        from './layouts/profil/profil.component';
import { ChatListComponent }      from './layouts/chat-list/chat-list.component';
import {ChatComponent}            from "./layouts/chat/chat.component";
import { DialogQrCodeComponent }  from './layouts/profil/components/dialog-qr-code/dialog-qr-code.component';
import { QrcodeComponent }        from './layouts/qrcode/qrcode.component';
import { PhotosComponent } from './layouts/photos/photos.component';

@NgModule({
  declarations: [ProfilComponent, EditProfilComponent, HomeComponent, CardImageComponent, ChatListComponent, ChatComponent, DialogQrCodeComponent, QrcodeComponent, PhotosComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule { }
//TODO guest module
