import { Timestamp } from "firebase/firestore";

export interface Image {
  id : string;
  userID: string;
  path : string;
  createDate : Timestamp;
  description : string;
  like: string[];
}
