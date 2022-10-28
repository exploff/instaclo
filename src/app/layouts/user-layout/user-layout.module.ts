import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserLayoutComponent } from './user-layout.component';



@NgModule({
  declarations: [UserLayoutComponent],
  imports: [
    SharedModule
  ],
  exports: [ UserLayoutComponent]
})
export class UserLayoutModule { }
