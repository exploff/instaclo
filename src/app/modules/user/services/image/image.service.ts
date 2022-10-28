import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection.constant';
import { GenericFirestoreService } from '../generic-firestore.service';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Image } from "../../../modules/user/models/image.model";
import { Observable } from "rxjs";

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

  public fetchMoviesByPagination(startAfterImage: string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {

    return this.genericFirestoreService.fetchByPagination<Image>(this.imageCollection, "id",
      startAfterImage, maxResult, direction) as Observable<Image[]>;
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
}
