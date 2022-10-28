import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLayoutComponent } from './user-layout.component';

@NgModule({
  declarations: [UserLayoutComponent,NavbarComponent],
  imports: [
    SharedModule
  ],
  exports: [ UserLayoutComponent]
})
export class UserLayoutModule { }
