import {User} from "../../../core/models/user.model";

export interface ChatRoom {
  id : string;
  created_date : string;
  user_uid_from : string;
  user_uid_to : string;
  users: User[];
}
