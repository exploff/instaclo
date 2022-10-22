import { NgModule } from "@angular/core";
import { GuestLayoutComponent } from "./guest-layout.component";
import { SharedModule } from "src/app/modules/shared.module";


@NgModule({
  declarations: [GuestLayoutComponent],
  imports: [SharedModule],
  exports: [GuestLayoutComponent],
})
export class GuestLayoutModule { }
