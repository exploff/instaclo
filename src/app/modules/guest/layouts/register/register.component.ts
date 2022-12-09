import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      pseudo: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: checkMatchField('password', 'confirmPassword'),
    }
  );

  public errorMessage: string = '';
  public hide: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) { }

  public async register(group: FormGroup): Promise<void> {
    try {
      const result = await this.authenticationService.signUp(
        group.controls['email'].value!,
        group.controls['password'].value!,
        group.controls['firstname'].value!,
        group.controls['lastname'].value!,
        group.controls['pseudo'].value!
      );
      if (!result) {
        this.errorMessage = 'Veuillez saisir des infomartions correctes !';
      } else {
        const data: User = {
          id: '',
          uid: result.user.uid,
          profilImage:"/assets/images/blank-profile.png",
          firstName: group.controls['firstname'].value!,
          lastName: group.controls['lastname'].value!,
          pseudo: group.controls['pseudo'].value!,
          bio: '',
          email: group.controls['email'].value!,
          keywords: this.userService.generateKeywords(group.controls['pseudo'].value!),
          followers:[],
          follows:[],
        };
        await this.userService.addNewUser(data);
        this.router.navigate(['/login'], { queryParams: { register: 'true' } });
      }
    } catch (error) {
      if (error as FirebaseError) {
        let e = error as FirebaseError;
        if (e.message.includes("email-already-in-use")) {
          this.errorMessage = 'Cette adresse mail est déjà utilisée.';
        }
      } else {
        this.errorMessage = 'Une erreur est survenue.';
      }
    }
  }

  public async googleLogin(): Promise<void> {
    try {
      const result = await this.authenticationService.googleAuth();
      if (result == null) {
        this.errorMessage = "Erreur d'authentification";
      } else {
        const user = await this.userService.fetchUserByUID(result.user.uid);
        user.subscribe(async (val) => {
          console.log(val);
          if (val.length > 0) {
            console.log('user exists');
          } else {
            console.log('user does not exist');
            var displayName = result.user.displayName;
            const data: User = {
              id: "",
              uid: result.user.uid,
              profilImage:"/assets/images/blank-profile.png",
              firstName: displayName ? displayName.split(' ')[0] : '',
              lastName: displayName ? displayName.split(' ')[1] : '',
              pseudo: displayName ? `${displayName.split(' ')[0].slice(0,1)}.${displayName.split(' ')[1]}` : '',
              bio: "",
              email: result.user.email ? result.user.email : '',
              keywords: this.userService.generateKeywords(displayName ? displayName : ''),
              followers:[],
              follows:[],
            };
            await this.userService.addNewUser(data);
          }
        });
        this.router.navigateByUrl('/user');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.register(this.registerForm);
    }
  }
}

export function checkMatchField(
  controlName: string,
  checkControlName: string
): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);
    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }
    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ matching: true });
      return { matching: true };
    } else {
      return null;
    }
  };
}
