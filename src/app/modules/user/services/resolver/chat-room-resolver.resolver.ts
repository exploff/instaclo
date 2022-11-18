import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ChatRoom} from "../../models/chat-room.model";
import {AuthenticationService} from "../../../../core/services/authentification/authentification.service";
import {UserService} from "../../../../core/services/user/user.service";
import {ChatRoomService} from "../chat-room/chat-room.service";

@Injectable({
  providedIn: 'root'
})

export class ChatRoomResolverResolver implements Resolve<ChatRoom[]> {

  constructor(private authService: AuthenticationService, private userService: UserService, private chatRoomService: ChatRoomService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ChatRoom[]> {
    let uid = this.authService.getUserUID();
    if (uid) {
      return this.chatRoomService.fetchChatRoomByUserUidFromORUserUidTo(uid)
    }
    return new Observable<ChatRoom[]>();
  }
}
