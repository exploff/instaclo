import { Injectable } from "@angular/core";
import { Storage, ref, StorageReference, listAll, ListResult, list, getMetadata, FullMetadata, updateMetadata, SettableMetadata, deleteObject, uploadBytes, UploadMetadata, UploadResult,
getDownloadURL, uploadBytesResumable, percentage, UploadTaskSnapshot, UploadTask, } from "@angular/fire/storage";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

constructor(private storage: Storage) { }

public getFilesList(path: string): Promise<ListResult> {
  const reference: StorageReference = ref(this.storage, path);
  return listAll(reference);
}

public getFilesListWithPagination(path: string, pageToken: string | null, maxResults: number = 10): Promise<ListResult> {
  const reference: StorageReference = ref(this.storage, path);
  return list(reference, { pageToken, maxResults });
}

public getFileMetaData(path: string): Promise<FullMetadata> {
  const reference: StorageReference = ref(this.storage, path);
  return getMetadata(reference);
}

public updateFileMetaData(path: string, metadata: SettableMetadata): Promise<FullMetadata> {
  const reference: StorageReference = ref(this.storage, path);
  return updateMetadata(reference, metadata);
}

public getFileDownloadUrl(path: string): Promise<string> {
  const reference: StorageReference = ref(this.storage, path);
  return getDownloadURL(reference);
}

public uploadFile(file: File, path: string, metadata?: UploadMetadata): Promise<UploadResult> {
  const reference: StorageReference = ref(this.storage, path);
  return uploadBytes(reference, file, metadata);
}

public uploadFileWithControl(file: File, path: string, metadata: UploadMetadata): UploadTask {
  const reference: StorageReference = ref(this.storage, path);
  return uploadBytesResumable(reference, file, metadata);
}

public getUploadPercentageValue(task: UploadTask): Observable<{ progress: number; snapshot: UploadTaskSnapshot }> {
  return percentage(task);
}

public deleteFile(path: string): Promise<void> {
  const reference: StorageReference = ref(this.storage, path);
  return deleteObject(reference);
}

}
