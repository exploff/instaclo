import { Image } from './../../models/image.model';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { HomeResolverModel } from './models/HomeResolverModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user!: User;

  public listFollowsImages!:Image[];

  private resolverData!:HomeResolverModel;

  constructor(private route: ActivatedRoute) { }

  public async ngOnInit() {
    this.route.params.subscribe()
    this.resolverData=this.route.snapshot.data['user']
    this.user = this.resolverData.currentUser
    this.listFollowsImages= this.resolverData.listFollowsImages
  }
}
