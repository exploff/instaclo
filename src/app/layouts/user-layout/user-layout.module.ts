import { NgModule } from "@angular/core";
import { UserLayoutComponent } from "./user-layout.component";
import { NavbarComponent } from "./navBar/navbar.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [UserLayoutComponent, NavbarComponent],
  imports: [SharedModule],
  exports: [UserLayoutComponent],
})
export class UserLayoutModule { }
