import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from "../../../../core/constants/firestore-collection.constant";
import { Message } from "../../models/message-chat.model";
import { GenericFirestoreService } from "../firestore/generic-firestore.service";

export class MessageChatService {

  private messageCollection: CollectionReference<DocumentData>;


  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
      this.messageCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.CHAT);
  }

  public async countAll(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
      return await this.genericFirestoreService.count(this.messageCollection);
  }

  public fetchAll(direction: "asc" | "desc" = "asc"): Observable<Message[]> {
      return this.genericFirestoreService.fetchAll<Message>(this.messageCollection, "id", direction);
  }

  public fetchChatById(id: string): Observable<Message> {
      return this.genericFirestoreService.fetchById<Message>(FIREBASE_COLLECTION_PATHS.CHAT, id);

  }

  public fetchMessageFromUser(fromUser: string): Observable<Message[]> {
      return this.genericFirestoreService.fetchByProperty<Message>(this.messageCollection, "fromUser", fromUser, 1);
  }

  public addNewMessage(chat: Message): Promise<DocumentReference<DocumentData>> {
      return this.genericFirestoreService.create(this.messageCollection, chat);
  }

  public updateMessage(chat: Message): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.CHAT, chat);
  }
  public deleteMessage(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.CHAT, id);
  }
}
