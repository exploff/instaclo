import { Injectable } from "@angular/core";
import { addDoc, collectionData, deleteDoc, docData, getCountFromServer, DocumentReference, Firestore, query, updateDoc, where, limit, orderBy, startAfter, WithFieldValue, getDoc, startAt, endAt } from "@angular/fire/firestore";
import { CollectionReference, doc, DocumentData } from "@firebase/firestore";
import { AggregateField, AggregateQuerySnapshot } from "@firebase/firestore";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class GenericFirestoreService {

  constructor(private readonly firestore: Firestore) { }

  public count(collection: CollectionReference<DocumentData>): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>> {

    const request = query(collection);
    return getCountFromServer(request);

  }

  public fetchAll<T>(collection: CollectionReference<DocumentData>, propertyName: string, direction: "asc" | "desc" = "asc"): Observable<T[]> {

    const request = query(collection, orderBy(propertyName, direction));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  public fetchByPagination<T>(collection: CollectionReference<DocumentData>, propertyName: string, startAfterProperty:
    string, maxResult: number = 30, direction: "asc" | "desc" = "asc") {

    const request = query(collection, orderBy(propertyName, direction), limit(maxResult), startAfter(startAfterProperty));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  public fetchById<T>(path: string, id: string): Observable<T> {
    const documentReference = doc(this.firestore, `${path}/${id}`);
    return docData(documentReference, { idField: "id" }) as Observable<T>;
  }

  public fetchByProperty<T>(collection: CollectionReference<DocumentData>, propertyName: string, propertyValue: string, maxResult: number = 5):
    Observable<T[]> {
    const request = query(collection, where(propertyName, "==", propertyValue), limit(maxResult));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }
  public fetchByPropertyiInOrder<T>(collection: CollectionReference<DocumentData>, propertyName: string, propertyValue: string, directionproperty:string,
                                     direction: "asc" | "desc" = "desc"):
    Observable<T[]> {
    const request = query(collection, orderBy(directionproperty, direction), where(propertyName, "==", propertyValue));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  public fetchByPropertySpecialChatInOrder<T>(collection: CollectionReference<DocumentData>, propertyName1: string, propertyName2: string, propertyValue: string, directionproperty:string,
                                    direction: "asc" | "desc" = "desc"):
    Observable<T[]> {
    const request = query(collection, orderBy(directionproperty, direction), where(propertyName1, "==", propertyValue), where(propertyName2, "==", propertyValue));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  public fetchByKeywords<T>(collection: CollectionReference<DocumentData>, propertyValue: string, max: number = 50):
    Observable<T[]> {
    //const request = query(collection, orderBy(propertyName, "asc"), startAt(propertyValue.toUpperCase()), endAt(propertyValue.toLowerCase() + "\uf8ff"), limit(maxResult));
    const request = query(collection, where('keywords', "array-contains", propertyValue.toLowerCase()), limit(max));
    return collectionData(request, { idField: "id" }) as Observable<T[]>;
  }

  public create<T>(collection: CollectionReference<T>, object: WithFieldValue<T>): Promise<DocumentReference<T>> {
    return addDoc(collection, object);
  }


  public update<T extends { id: string }>(path: string, object: T): Promise<void> {
    const documentReference = doc(this.firestore, `${path}/${object.id}`);
    return updateDoc(documentReference, { ...object });
  }

  public delete(path: string, id: string) {
    const documentReference = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(documentReference);
  }

}
