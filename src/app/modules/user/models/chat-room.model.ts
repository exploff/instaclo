import {User} from "../../../core/models/user.model";

export interface ChatRoom {
  id : string;
  created_date : string;
  users: Pick<User, 'id' | 'pseudo'> [];
  user_id : string;
  user_uid : string;
}
