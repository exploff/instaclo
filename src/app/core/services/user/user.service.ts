import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AggregateField, AggregateQuerySnapshot, collection, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";
import { Observable } from "rxjs";
import { FIREBASE_COLLECTION_PATHS } from 'src/app/core/constants/firestore-collection.constant';
import { GenericFirestoreService } from '../../../modules/user/services/firestore/generic-firestore.service';
import { User } from '../../models/user.model';

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

  public fetchUsersByPagination(startAfterUser: string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {

      return this.genericFirestoreService.fetchByPagination<User>(this.userCollection, "id",
      startAfterUser, maxResult, direction) as Observable<User[]>;
  }

  public fetchUserByUID(uid: string): Observable<User[]> {
    return this.genericFirestoreService.fetchByProperty<User>(this.userCollection, "uid",uid, 1);
  }

  public fetchUserById(id: string): Observable<User[]> {
    return this.genericFirestoreService.fetchByProperty<User>(this.userCollection, "id", id, 1);
  }

  public fetchUserFromUser(fromUser: string): Observable<User[]> {
      return this.genericFirestoreService.fetchByProperty<User>(this.userCollection, "fromUser", fromUser, 1);
  }

  public addNewUser(user: User): Promise<DocumentReference<DocumentData>> {
      const doc = this.genericFirestoreService.create(this.userCollection, user);
      doc.then((docRef) => {
          user.id = docRef.id;
          this.updateUser(user);
      })
      return doc;
  }

  public updateUser(user: User): Promise<void> {
    console.log(user);
    return this.genericFirestoreService.update(FIREBASE_COLLECTION_PATHS.USER, user);
  }
  public deleteUser(id: string) {
    return this.genericFirestoreService.delete(FIREBASE_COLLECTION_PATHS.USER, id);
  }
}
