import {User} from "../../../core/models/user.model";

export interface ChatRoom {
  id : string;
  created_date : string;
  users: string [];
  user_id : string;
}
