import { HomeResolverResolver } from './services/resolver/home-resolver.resolver';
import { PhotosComponent } from './layouts/photos/photos.component';
import { ChatComponent } from './layouts/chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { UsersResolverResolver } from './services/resolver/users-resolver.resolver';

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
        resolve: {
          user: HomeResolverResolver
        }
      },
      {
        path: 'profil/:id',
        component: ProfilComponent,
        resolve: {
          user: UsersResolverResolver
        }
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
      },
      {
        path: '**',
        component: HomeComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
