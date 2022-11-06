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

  public fetchUserImages(userID: string): Observable<Image[]> {

    return this.genericFirestoreService.fetchByPropertyiInOrder<Image>(this.imageCollection, "userID", userID ,"createDate");
  }

  public async fetchUserfollowsImages(user: User):Promise<Image[]> {
    //TODO catch error and limitation for performence
    let listFollowsId=user.follows
    let listFollowsImage:Image[]=[];

    let currentUserImages= await lastValueFrom(this.fetchUserImages(user.id).pipe(take(1)))

    for(let image of currentUserImages){
      listFollowsImage.push(image)
    }
    for(let follow of listFollowsId) {
      let listFollowImage:Image[] =await lastValueFrom(this.fetchUserImages(follow).pipe(take(1)))
      for(let image of listFollowImage){
        listFollowsImage.push(image)
      }
    }

    return listFollowsImage.sort((a, b)=>b.createDate.toMillis() - a.createDate.toMillis())
  }
}
