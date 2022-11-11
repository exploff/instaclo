import { User } from "src/app/core/models/user.model"
import { Image } from '../../../models/image.model';


export interface HomeResolverModel {
  'currentUser':User,
  'listFollowsImages':Image[]
  'listFollowedUsers':User[]
}
