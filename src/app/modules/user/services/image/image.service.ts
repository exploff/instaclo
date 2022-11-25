import { Image } from './../../models/image.model';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { lastValueFrom, map, Observable, take } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from 'src/app/core/constants/firestore-collection.constant';
import { GenericFirestoreService } from '../firestore/generic-firestore.service';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
    this.imageCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.IMAGE);
  }

  public async countAll(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
    return await this.genericFirestoreService.count(this.imageCollection);
  }

  public fetchAll(direction: "asc" | "desc" = "asc"): Observable<Image[]> {
    return this.genericFirestoreService.fetchAll<Image>(this.imageCollection, "id", direction);
  }

  public fetchImagesByPagination(startAfterImageId: string, maxResult: number = 30, direction: "asc" | "desc" = "asc"): Observable<Image[]> {
    return this.genericFirestoreService.fetchByPagination<Image>(this.imageCollection, "id",
      startAfterImageId, maxResult, direction) as Observable<Image[]>;
  }

  public fetchImageById(id: string): Observable<Image> {
    return this.genericFirestoreService.fetchById<Image>(FIREBASE_COLLECTION_PATHS.IMAGE, id);
  }

  public fetchImageFromImage(fromImage: string): Observable<Image[]> {
    return this.genericFirestoreService.fetchByProperty<Image>(this.imageCollection, "fromImage", fromImage, 1);
  }

  public addNewImage(Image: Image): Promise<DocumentReference<DocumentData>> {
    return this.genericFirestoreService.create(this.imageCollection, Image);
  }

  public updateImage(Image: Image): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.IMAGE, Image);
  }
  public deleteImage(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.IMAGE, id);
  }

  public fetchUserImages(userID: string): Observable<Image[]> {
    return this.genericFirestoreService.fetchByPropertyInOrder<Image>(this.imageCollection, "userID", userID ,"createDate");
  }

  public fetchUsersImages(userIds: string[], maxResult: number = 5, direction: "asc" | "desc" = "desc"): Observable<Image[]> {
    return this.genericFirestoreService.fetchByPropertyContainsIn<Image>(this.imageCollection, "userID", userIds, "createDate", direction, maxResult);
  }

  public fetchUsersImagesByPagination(userIds: string[], startAfter: Image, maxResult: number = 5, direction: "asc" | "desc" = "desc"): Observable<Image[]> {
    return this.genericFirestoreService.fetchByPropertyContainsInPagination<Image>(this.imageCollection, "userID", userIds, "createDate", direction, startAfter, maxResult);
  }
}
