import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentification/authentification.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  public name = this.authenticationService.user;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  public async signOut(): Promise<void> {
    await this.authenticationService.signOut();
    this.router.navigateByUrl("/login");
  }
}
