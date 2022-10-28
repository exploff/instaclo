import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from "../../../../core/constants/firestore-collection.constant";
import { Chat } from "../../models/chat.model";
import { GenericFirestoreService } from "../firestore/generic-firestore.service";

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

  public fetchMoviesByPagination(startAfterChat: string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {

      return this.genericFirestoreService.fetchByPagination<Chat>(this.chatCollection, "id",
      startAfterChat, maxResult, direction) as Observable<Chat[]>;
  }

  public fetchChatById(id: string): Observable<Chat> {
      return this.genericFirestoreService.fetchById<Chat>(FIREBASE_COLLECTION_PATHS.CHAT, id);

  }

  public fetchChatFromUser(fromUser: string): Observable<Chat[]> {
      return this.genericFirestoreService.fetchByProperty<Chat>(this.chatCollection, "fromUser", fromUser, 1);
  }

  public addNewChat(chat: Chat): Promise<DocumentReference<DocumentData>> {
      return this.genericFirestoreService.create(this.chatCollection, chat);
  }

  public updateChat(chat: Chat): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.CHAT, chat);
  }
  public deleteChat(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.CHAT, id);
  }
}