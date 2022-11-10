import { PhotosComponent } from './layouts/photos/photos.component';
import { ChatComponent } from './layouts/chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { NotFoundUserComponent } from './layouts/not-found-user/not-found-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path :'**',
        component:NotFoundUserComponent
      },
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'photos',
        component: PhotosComponent,
      },
      {
        path: 'edit-profil',
        component: EditProfilComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
