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
  ) {}

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
        //Julien a ameliore c'etait juste pour tester !! je pense qu'in doit disctuer de l'id et du password
        const data: User = {
          id: '1',
          firstName: group.controls['firstname'].value!,
          lastName: group.controls['lastname'].value!,
          pseudo: group.controls['pseudo'].value!,
          bio: '',
          dateOfBirthday: '',
          email: group.controls['email'].value!,
          password: group.controls['password'].value!,
        };
        this.userService.addNewUser(data);
        this.router.navigateByUrl('/login');
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
