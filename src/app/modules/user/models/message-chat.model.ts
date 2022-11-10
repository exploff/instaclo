import { User } from "src/app/core/models/user.model";

export interface Message {
  id : string;
  datecreated : string;
  fromUser : string;
  toUser : string;
  message: string;
  user: Pick<User , 'id'|'firstName'| 'lastName' | 'pseudo'>
}
