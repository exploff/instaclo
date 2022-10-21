import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../core/services/authentification/authentification.service";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  public authenticationService: AuthenticationService | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
