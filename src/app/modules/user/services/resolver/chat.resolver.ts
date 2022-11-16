import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ChatService} from "../chat/chat.service";
import {Chat} from "../../models/chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatResolver implements Resolve<Chat[]> {
  constructor(private chatService: ChatService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat[]> {
    if (route.paramMap.get('id') != null) {
      let id = route.paramMap.get('id');
      if (id !== null) {
        return this.chatService.fetchChatByChatRoomId(id);
      }
    }
    return new Observable<Chat[]>();
  }
}
