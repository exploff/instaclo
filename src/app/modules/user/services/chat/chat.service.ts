import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { Tuple } from "src/app/core/models/tuple.model";
import { FIREBASE_COLLECTION_PATHS } from "../../../../core/constants/firestore-collection.constant";
import { Chat } from "../../models/chat.model";
import { GenericFirestoreService } from "../firestore/generic-firestore.service";

@Injectable({
  providedIn: "root",
})
export class ChatService {

  private chatCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
    this.chatCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.CHAT);
  }

  public async countAll(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    return await this.genericFirestoreService.count(this.chatCollection);
  }

  public fetchAll(direction: "asc" | "desc" = "asc"): Observable<Chat[]> {
    return this.genericFirestoreService.fetchAll<Chat>(this.chatCollection, "id", direction);
  }


  public fetchChatById(id: string): Observable<Chat> {
    return this.genericFirestoreService.fetchById<Chat>(FIREBASE_COLLECTION_PATHS.CHAT, id);
  }

  public fetchChatFromUser(fromUser: string): Observable<Chat[]> {
    return this.genericFirestoreService.fetchByProperty<Chat>(this.chatCollection, "fromUser", fromUser, 1);
  }

  public fetchChatByChatRoomId(chat: string): Observable<Chat[]> {
    return this.genericFirestoreService.fetchByProperty<Chat>(this.chatCollection, "id_chat_room", chat);
  }

  public fetchChatByChatRoomIdInOrder(chat: string, direction: "asc" | "desc" = "asc"): Observable<Chat[]> {
    return this.genericFirestoreService.fetchByPropertyInOrder<Chat>(this.chatCollection, "id_chat_room", chat, "date_created", "asc");
  }

  public countAllChatUnreadByUserUid(uidUser: string): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    //TODO
    let properties: Tuple<string, string>[] = [];
    properties.push({propertyName: "toUserUid", propertyValue: uidUser});
    properties.push({propertyName: "read", propertyValue: "false"});
    return this.genericFirestoreService.countByProperties(this.chatCollection, properties);
  }


  public readAllChatByRoomIdAndNotUserUid(idChatRoom: string, uidUser: string): void {
//TODO
  }

  public countAllChatUnreadByChatRoomIdAndNotUserUid(idChatRoom: string, uidUser: string): void {
//TODO
  }


  public addNewChat(chat: Chat): Promise<DocumentReference<DocumentData>> {
    const doc = this.genericFirestoreService.create(this.chatCollection, chat);
    doc.then((docRef) => {
      chat.id = docRef.id;
      this.updateChat(chat);
    });
    return doc;
  }

  public updateChat(chat: Chat): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.CHAT, chat);
  }
  public deleteChat(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.CHAT, id);
  }
}
