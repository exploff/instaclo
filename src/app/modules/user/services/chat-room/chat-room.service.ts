import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from "../../../../core/constants/firestore-collection.constant";
import { ChatRoom } from "../../models/chat-room.model";
import { GenericFirestoreService } from "../firestore/generic-firestore.service";

@Injectable({
  providedIn: "root",
})
export class ChatRoomService {

  private chatRoomCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
    this.chatRoomCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.CHAT_ROOM);
  }

  public async countAll(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    return await this.genericFirestoreService.count(this.chatRoomCollection);
  }

  public fetchAll(direction: "asc" | "desc" = "asc"): Observable<ChatRoom[]> {
    return this.genericFirestoreService.fetchAll<ChatRoom>(this.chatRoomCollection, "id", direction);
  }


  public fetchChatRoomById(id: string): Observable<ChatRoom> {
    return this.genericFirestoreService.fetchById<ChatRoom>(FIREBASE_COLLECTION_PATHS.CHAT_ROOM, id);

  }

  public fetchChatRoomByUserId(id: string): Observable<ChatRoom[]> {
    return this.genericFirestoreService.fetchByPropertyInOrder<ChatRoom>(this.chatRoomCollection, "user_id", id, "created_date", "desc");
  }

  public fetchChatRoomByUserUid(uid: string): Observable<ChatRoom[]> {
    return this.genericFirestoreService.fetchByPropertyInOrder<ChatRoom>(this.chatRoomCollection, "user_uid_from", uid, "created_date", "desc");
  }

  public fetchChatRoomByUserUidFromORUserUidTo(uid: string): Observable<ChatRoom[]> {
    return this.genericFirestoreService.fetchByPropertySpecialChatInOrder<ChatRoom>(this.chatRoomCollection, "uid_user", uid, "created_date", "desc");
  }

  public addNewChatRoom(chatRoom: ChatRoom): Promise<DocumentReference<DocumentData>> {
    const doc = this.genericFirestoreService.create(this.chatRoomCollection, chatRoom);
    doc.then((docRef) => {
      chatRoom.id = docRef.id;
      this.updateChatRoom(chatRoom);
    });
    return doc;
  }

  public updateChatRoom(chatRoom: ChatRoom): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.CHAT_ROOM, chatRoom);
  }
  public deleteChatRoom(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.CHAT_ROOM, id);
  }
}
