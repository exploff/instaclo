import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ProfilComponent } from './layouts/profil/profil.component';
import { EditProfilComponent } from './layouts/edit-profil/edit-profil.component';
import { UsersResolverResolver } from './services/resolver/users-resolver.resolver';
import {ChatListComponent} from "./layouts/chat-list/chat-list.component";
import {ChatRoomResolverResolver} from "./services/resolver/chat-room-resolver.resolver";
import { QrcodeComponent } from './layouts/qrcode/qrcode.component';
import { CurrentUserResolver } from './services/resolver/current-user.resolver';
import { PhotosComponent } from './layouts/photos/photos.component';

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
          currentUser: CurrentUserResolver,
        }
      },
      {
        path: 'profil',
        component: ProfilComponent,
        resolve: {
          currentUser: CurrentUserResolver
        },
        pathMatch: 'full'
      },
      {
        path: 'profil/:id',
        component: ProfilComponent,
        resolve: {
          user: UsersResolverResolver,
          currentUser: CurrentUserResolver
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
          chatRooms: ChatRoomResolverResolver
        }
      },
      {
        path: 'edit-profil',
        component: EditProfilComponent,
      },
      {
        path: 'qrcode/:id',
        component: QrcodeComponent,
        resolve: {
          userToAdd: UsersResolverResolver,
          currentUser: CurrentUserResolver
        },
        pathMatch: 'full'
      },
      {
        path: 'photos',
        component: PhotosComponent
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
