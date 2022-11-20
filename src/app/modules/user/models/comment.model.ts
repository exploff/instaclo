import { Timestamp } from "firebase/firestore";

export interface Comment {
  userId:string,
  fullName: string,
  comment:string,
  createDate: Timestamp
}
