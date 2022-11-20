import { Timestamp } from "firebase/firestore";
import { Comment } from "./comment.model";

export interface Image {
  id : string;
  userID: string;
  path : string;
  createDate : Timestamp;
  description : string;
  like: string[];
  comments: Comment[];
}
