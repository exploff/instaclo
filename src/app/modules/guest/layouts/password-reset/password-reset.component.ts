import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  constructor(private authentificationService: AuthenticationService,
    private router: Router) { }

  passwordResetForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
    }
  );

  public errorMessage: string = '';

  public onSubmit() {
    if (this.passwordResetForm.invalid) {
      return;
    } else {
      this.resetPassword(this.passwordResetForm);
    }
  }

  private async resetPassword(group: FormGroup): Promise<void> {
    const result = this.authentificationService.forgotPassword(group.controls['email'].value!);
    if (result == null) {
      this.errorMessage = "Erreur de réinitialisation du mot de passe";
    } else {
      this.router.navigate(['/login'], { queryParams: { resetPassword: 'true' } });
    }
  }

}
