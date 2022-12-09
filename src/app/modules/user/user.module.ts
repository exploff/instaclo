import { DialogComponent } from './layouts/photos/dialog/dialog.component';
import { CardImageProfilComponent } from './layouts/profil/components/card-image-profil/card-image-profil.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserRoutingModule } from './user-routing.module';

import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { CardImageComponent } from './layouts/home/components/card-image/card-image.component';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { ChatListComponent } from './layouts/chat-list/chat-list.component';
import { ChatComponent } from './layouts/chat/chat.component';
import { DialogQrCodeComponent } from './layouts/profil/components/dialog-qr-code/dialog-qr-code.component';
import { QrcodeComponent } from './layouts/qrcode/qrcode.component';
import { PhotosComponent } from './layouts/photos/photos.component';
import { DialogCommentComponent } from './layouts/home/components/card-image/dialog-comment/dialog-comment.component';
import { QrcodeScannerComponent } from './layouts/qrcode-scanner/qrcode-scanner.component';
import { DialogLikeComponent } from './layouts/home/components/card-image/dialog-like/dialog-like.component';
import { DialogUpdateComponent } from './layouts/profil/components/card-image-profil/dialog-update/dialog-update.component';

@NgModule({
  declarations: [
    ProfilComponent,
    EditProfilComponent,
    HomeComponent,
    CardImageComponent,
    ChatListComponent,
    ChatComponent,
    DialogQrCodeComponent,
    QrcodeComponent,
    PhotosComponent,
    DialogCommentComponent,
    QrcodeScannerComponent,
    CardImageProfilComponent,
    DialogComponent,
    DialogLikeComponent,
    DialogUpdateComponent,
  ],
  imports: [SharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule {}
//TODO guest module
