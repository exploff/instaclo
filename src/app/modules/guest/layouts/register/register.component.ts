import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  },
    {
      // validators: confirmPasswordValidator,
    }
  )


  public errorMessage: string = '';
  public hide: boolean = true;



  constructor(private authenticationService: AuthenticationService, private router: Router) { }


  public async register(group: FormGroup): Promise<void> {
    try {
      const result = await this.authenticationService.signUp(
        group.controls['email'].value!,
        group.controls['password'].value!,
        group.controls['firstname'].value!, group.controls['lastname'].value!, group.controls['pseudo'].value!);
      if (!result) {
        this.errorMessage = "Veuillez saisir des infomartions correctes !";
      } else {
        //TODO : Firestore
        this.router.navigateByUrl('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }

  // public getErrorMessageEmail() {
  //   if (this.email.hasError('required')) {
  //     return 'Vous devez entrer une valeur';
  //   }
  //   return this.email.hasError('email') ? 'Veuillez entrer une adresse email' : '';
  // }
  // public getErrorMessageFirstname() {
  //   return this.firstname.hasError('required') ? "Vous devez entrer une valeur" : "";
  // }
  // public getErrorMessageLastname() {
  //   return this.lastname.hasError('required') ? "Vous devez entrer une valeur" : "";

  // }
  // public getErrorMessagePseudo() {
  //   if (this.pseudo.hasError('required')) {
  //     return 'Vous devez entrer une valeur';
  //   }
  //   return this.email.hasError('minlength') ? 'Veuillez entrer un speudo plus grand' : '';
  // }

  // public getErrorMessagePassword() {
  //   if (this.password.hasError('required')) {
  //     return 'Vous devez entrer une valeur';
  //   }
  //   return this.password.hasError('minlength') ? 'Veuillez entrer un mot de passe plus grand' : '';
  // }

  // public getErrorMessageConfirmPassword() {
  //   if (this.confirmPassword.hasError('required')) {
  //     return 'Vous devez entrer une valeur';
  //   }
  //   return this.confirmPassword.hasError('minlength') ? 'Veuillez entrer un mot de passe plus grand' : '';
  // }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.register(this.registerForm);
    }
  }


}

// export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');
//   return password && confirmPassword && password.value == confirmPassword.value ? {
//     confirmPassword: true
//   } : null
// }

