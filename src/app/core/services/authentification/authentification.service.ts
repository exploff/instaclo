import { Injectable } from "@angular/core";
import { FirebaseError } from "@angular/fire/app";
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  User,
  UserCredential,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "@angular/fire/auth";
import { EMPTY, Observable, of } from "rxjs";
import { UserService } from "src/app/core/services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user: Observable<User | null> = EMPTY;

  constructor(private readonly auth: Auth) {
    if (this.auth) {
      this.user = authState(this.auth);
      onAuthStateChanged(this.auth, (user) => {
        this.user = of(user);
      },
        (error) => {
          // TODO : Catch error in signin and signup function
          console.error(error);
        });
    }
  }

  public getUserUID(): string | null {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }
    return null;
  }


  public async signIn(email: string, password: string): Promise<UserCredential | null> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  public async signUp(email: string, password: string, firstname: string,
    lastname: string, identifiant: string): Promise<UserCredential | null> {

    try {
      const data: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const displayName: string = firstname + ' ' + lastname;

      await updateProfile(data.user, { displayName: displayName });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async signOut(): Promise<void | null> {
    try {
      return await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  public async forgotPassword(passwordResetEmail: string): Promise<void | null> {
    try {
      return await sendPasswordResetEmail(this.auth, passwordResetEmail);
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  public async authLogin(provider: GoogleAuthProvider): Promise<UserCredential | null> {
    try {
      return await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.log(error);
    }
    return null
  }
}
