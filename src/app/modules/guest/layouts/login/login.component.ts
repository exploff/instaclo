import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }
  );
  public hide: boolean = true;
  public errorMessage: string = '';
  public successMessage: string = '';

  constructor(
    private authentificationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      if (params.get('register')) {
        this.successMessage = 'Votre compte a bien été créé !';
      }
      if (params.get('resetPassword')) {
        this.successMessage = 'Si votre compte existe un email de réinitialisation vous a été envoyé !';
      }
    }
    );
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.login(this.loginForm);
    }
  }

  public async login(group: FormGroup): Promise<void> {
    try {
      if (group.valid) {
        const result = await this.authentificationService.signIn(
          group.controls['email'].value,
          group.controls['password'].value
        );
        if (result == null) {
          this.errorMessage = "Erreur d'authentification";
        } else {
          this.router.navigateByUrl('/user');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async googleLogin(): Promise<void> {
    try {
      const result = await this.authentificationService.googleAuth();
      if (result == null) {
        this.errorMessage = "Erreur d'authentification";
      } else {
        const user = await this.userService.fetchUserByUID(result.user.uid);
        user.subscribe((val) => {
          console.log(val);
          if (val.length > 0) {
            console.log('user exists');
          } else {
            console.log('user does not exist');
            var displayName = result.user.displayName;
            const data: User = {
              id: "",
              uid: result.user.uid,
              firstName: displayName ? displayName.split(' ')[0] : '',
              lastName: displayName ? displayName.split(' ')[1] : '',
              pseudo: displayName ? displayName : '',
              bio: "",
              email: result.user.email ? result.user.email : ''
            };
            this.userService.addNewUser(data);
          }
        });
        this.router.navigateByUrl('/user');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
