import { User } from "../../../core/models/user.model";

export interface Chat {
  id: string;
  id_chat_room: string;
  uid_user: string;
  pseudo_user: string;
  message: string;
  date_created: string;
}
