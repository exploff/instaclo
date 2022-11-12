import {User} from "../../../core/models/user.model";

export interface Chat {
  id : string;
  id_chat_room : Pick<Chat , 'id'>;
  id_user : Pick<User , 'id'>;
  message : string;
  date_created : string;
}
