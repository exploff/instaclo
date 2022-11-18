import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-user',
  templateUrl: './not-found-user.component.html',
  styleUrls: ['./not-found-user.component.scss']
})
export class NotFoundUserComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {

    // setTimeout( () => {
    //   this.router.navigate(['/user']);
    // },
    // 5000)
  }

}
