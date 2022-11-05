export interface User {
  id: string;
  uid: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  bio: string;
  email: string;
  followers:string[];
  follows:string[];
  keywords: string[];
}
