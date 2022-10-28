import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  public errorMessage: string = '';
  public hide: boolean = true;

  constructor(private authentificationService: AuthenticationService, private router: Router) { }

  public async login(): Promise<void> {
    try {
      if (this.email != null && this.password != null) {
        const result = await this.authentificationService.signIn(this.email.value!, this.password.value!);
        if (result == null) {
          this.errorMessage = "Erreur d'authentification";
        }
      }
      this.router.navigateByUrl('/user');
    } catch (error) {
      console.log(error);
    }
  }

  public getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    return this.email.hasError('email') ? 'Veuillez entrer une adresse email' : '';
  }

}
