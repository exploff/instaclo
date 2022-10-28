import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection.constant';
import { GenericFirestoreService } from '../generic-firestore.service';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Notification } from "../../../modules/user/models/notification.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
    this.notificationCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.NOTIFICATION);
  }

  public async countAll(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    return await this.genericFirestoreService.count(this.notificationCollection);
  }

  public fetchAll(direction: "asc" | "desc" = "asc"): Observable<Notification[]> {
    return this.genericFirestoreService.fetchAll<Notification>(this.notificationCollection, "id", direction);
  }

  public fetchMoviesByPagination(startAfterNotification: string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {

    return this.genericFirestoreService.fetchByPagination<Notification>(this.notificationCollection, "id",
      startAfterNotification, maxResult, direction) as Observable<Notification[]>;
  }

  public fetchNotificationById(id: string): Observable<Notification> {
    return this.genericFirestoreService.fetchById<Notification>(FIREBASE_COLLECTION_PATHS.NOTIFICATION, id);

  }

  public fetchNotificationFromNotification(fromNotification: string): Observable<Notification[]> {
    return this.genericFirestoreService.fetchByProperty<Notification>(this.notificationCollection, "fromNotification", fromNotification, 1);
  }

  public addNewNotification(Notification: Notification): Promise<DocumentReference<DocumentData>> {
    return this.genericFirestoreService.create(this.notificationCollection, Notification);
  }

  public updateNotification(Notification: Notification): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.NOTIFICATION, Notification);
  }
  public deleteNotification(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.NOTIFICATION, id);
  }

}
