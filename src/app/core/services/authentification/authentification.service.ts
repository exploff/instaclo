import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  constructor() {
   }

   /**
 * async signUp
email: string, password: string, firstname: string, lastname: string : Promise<UserCredential | null>*/
// public async signUp(email: string, password: string, firstname: string, lastname: string): Promise<User Credential | null>
// {
//   try {
//     const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
//     const displayName: string = `${lastname.toLocaleUppercase()} ${firstname}`;
//     await updateProfile(data.user, {displayName});
//     return data;
//   } catch (error) {
//     return null;
//   }

// }

// public async signIn(email: string, password: string): Promise<User Credential | null>
// {
//   try {
//     const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
//     const displayName: string = `${lastname.toLocaleUppercase()} ${firstname}`;
//     return await signInWithCredential(data.user, {displayName});
//     return data;
//   } catch (error) {
//     return null;
//   }

// }

}


