import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuestLayoutComponent } from './guest-layout.component';

@NgModule({
  declarations: [GuestLayoutComponent],
  imports: [SharedModule],
  exports: [GuestLayoutComponent]
})
export class GuestLayoutModule { }
