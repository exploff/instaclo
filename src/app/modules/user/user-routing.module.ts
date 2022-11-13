import { HomeResolverResolver } from './services/resolver/home-resolver.resolver';
import { PhotosComponent } from './layouts/photos/photos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { UsersResolverResolver } from './services/resolver/users-resolver.resolver';
import {ChatListComponent} from "./layouts/chat-list/chat-list.component";
import {ChatRoomResolverResolver} from "./services/resolver/chat-room-resolver.resolver";
import { QrcodeComponent } from './layouts/qrcode/qrcode.component';

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
        path: 'profil',
        component: ProfilComponent,
        resolve: {
          user: UsersResolverResolver
        },
        pathMatch: 'full'
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
        component: ChatListComponent,
        resolve: {
          chatRooms: ChatRoomResolverResolver,
        },
        pathMatch: 'full'
      },
      {
        path: 'chat/:id',
        component: ChatListComponent,
        resolve: {
          chatRooms: ChatRoomResolverResolver,
          chatWithUser: UsersResolverResolver
        }
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
        path: 'qrcode/:id',
        component: QrcodeComponent,
        resolve: {
          userToAdd: UsersResolverResolver
        },
        pathMatch: 'full'
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
