import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FIREBASE_COLLECTION_PATHS } from '../../constants/firestore-collection.constant';
import { GenericFirestoreService } from '../generic-firestore.service';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private readonly genericFirestoreService: GenericFirestoreService) {
      this.userCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.USER);
  }

  public async countAll(): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {
      return await this.genericFirestoreService.count(this.userCollection);
  }

  public fetchAll(direction: "asc" | "desc" = "asc"): Observable<User[]> {
      return this.genericFirestoreService.fetchAll<User>(this.userCollection, "id", direction);
  }

  public fetchMoviesByPagination(startAfterUser: string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {

      return this.genericFirestoreService.fetchByPagination<User>(this.userCollection, "id",
      startAfterUser, maxResult, direction) as Observable<User[]>;
  }

  public fetchUserById(id: string): Observable<User> {
      return this.genericFirestoreService.fetchById<User>(FIREBASE_COLLECTION_PATHS.USER, id);

  }

  public fetchUserFromUser(fromUser: string): Observable<User[]> {
      return this.genericFirestoreService.fetchByProperty<User>(this.userCollection, "fromUser", fromUser, 1);
  }

  public addNewUser(user: User): Promise<DocumentReference<DocumentData>> {
      return this.genericFirestoreService.create(this.userCollection, user);
  }

  public updateUser(user: User): Promise<void> {
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.USER, user);
  }
  public deleteUser(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.USER, id);
  }
}
