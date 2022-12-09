import { User } from "../../../core/models/user.model";

export interface ChatRoom {
  id: string;
  created_date: string;
  uid_user: string[];
  user: User[];
}
