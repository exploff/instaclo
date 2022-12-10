import { Image } from './../../models/image.model';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthenticationService } from 'src/app/core/services/authentification/authentification.service';
import { User } from 'src/app/core/models/user.model';
import { ImageService } from '../../services/image/image.service';
import { Observable, BehaviorSubject, merge, tap, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  public user!: User;
  public follows: string[] = [];

  public listImages!: Observable<Image[]>;
  public images$: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);

  constructor(private imageService: ImageService, private router: Router, private route: ActivatedRoute) { }

  @HostListener('window:scroll', ['$event']) onScrollEvent(event: any){
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= max) {
      let lastImage = this.images$.value[this.images$.value.length - 1];
      const values = this.images$.value;
      this.imageService.fetchUsersImagesByPagination(this.follows, lastImage.createDate)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(images => {
        this.images$.next(values.concat(images));
      });
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.follows = this.user.follows;
    //Parcequ'on veut voir également nos posts
    this.follows.push(this.user.id);
    this.loadImages();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCurrentUser() {
    if (this.route.snapshot.data['currentUser'] != undefined) {
      this.user = this.route.snapshot.data['currentUser'][0];
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadImages() {
    this.imageService.fetchUsersImages(this.follows).pipe(
      tap(images => {
        this.images$.next(images);
      })
    ).subscribe();
  }

  trackImage(index:number,image:Image){
    return image.id
  }
}
