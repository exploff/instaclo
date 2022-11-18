import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  AggregateField,
  AggregateQuerySnapshot,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { lastValueFrom, map, Observable, take } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/core/constants/firestore-collection.constant';
import { GenericFirestoreService } from '../../../modules/user/services/firestore/generic-firestore.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore,
    private readonly genericFirestoreService: GenericFirestoreService
  ) {
    this.userCollection = collection(
      this.firestore,
      FIREBASE_COLLECTION_PATHS.USER
    );
  }

  public async countAll(): Promise<
    AggregateQuerySnapshot<{ count: AggregateField<number> }>
    > {
    return await this.genericFirestoreService.count(this.userCollection);
  }

  public fetchAll(direction: 'asc' | 'desc' = 'asc'): Observable<User[]> {
    return this.genericFirestoreService.fetchAll<User>(
      this.userCollection,
      'id',
      direction
    );
  }

  public fetchUsersByPagination(
    startAfterUser: string,
    maxResult: number = 30,
    direction: 'asc' | 'desc' = 'asc'
  ) {
    return this.genericFirestoreService.fetchByPagination<User>(
      this.userCollection,
      'id',
      startAfterUser,
      maxResult,
      direction
    ) as Observable<User[]>;
  }

  public fetchUserByUID(uid: string): Observable<User[]> {
    return this.genericFirestoreService.fetchByProperty<User>(
      this.userCollection,
      'uid',
      uid,
      1
    );
  }

  public fetchUserById(id: string): Observable<User> {
    return this.genericFirestoreService.fetchById<User>(
      FIREBASE_COLLECTION_PATHS.USER,
      id
    );
  }


  public fetchUserByKeywords(pseudo: string): Observable<User[]> {
    return this.genericFirestoreService.fetchByKeywords<User>(
      this.userCollection,
      pseudo
    );
  }

  public fetchUserByPseudo(pseudo: string): Observable<User[]> {
    return this.genericFirestoreService.fetchByProperty<User>(
      this.userCollection,
      'pseudo',
      pseudo
    );
  }

  public fetchUserFromUser(fromUser: string): Observable<User[]> {
    return this.genericFirestoreService.fetchByProperty<User>(
      this.userCollection,
      'fromUser',
      fromUser,
      1
    );
  }

  public addNewUser(user: User): Promise<DocumentReference<DocumentData>> {

    const doc = this.genericFirestoreService.create(this.userCollection, user);
    doc.then((docRef) => {
      user.id = docRef.id;
      this.updateUser(user);
    });
    return doc;
  }

  public updateUser(user: User): Promise<void> {
    console.log(user);
    return this.genericFirestoreService.update(
      FIREBASE_COLLECTION_PATHS.USER,
      user
    );
  }
  public deleteUser(id: string) {
    return this.genericFirestoreService.delete(
      FIREBASE_COLLECTION_PATHS.USER,
      id
    );
  }

  public generateKeywords(string: String): string[] {
    let pseudo = string.toLowerCase();
    let keywords: string[] = [];
    let words: string[] = pseudo.split(' ');
    for (let word of words) {
      let keyword: string = '';
      for (let i = 0; i < word.length; i++) {
        keyword += word[i];
        keywords.push(keyword);
      }
    }
    return keywords;
  }
  public async getCurrentUser(uid :string):Promise<User>{
    return await lastValueFrom(this.fetchUserByUID(uid).pipe(take(1),map(user=>user[0])))
    // return this.fetchUserByUID(uid).pipe(map(user=>user[0]))
  }

  async getFollowedUsers(currentUser:User):Promise<User[]>{
    let returnList:User[]=[]
    for(let id of currentUser.follows){
      let user = await lastValueFrom(this.fetchUserById(id).pipe(take(1)))
      returnList.push(user)
    }
    return returnList
  }

}
