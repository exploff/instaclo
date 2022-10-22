import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AutofocusDirective } from "./directives/auto-focus.directive";


const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];

const PIPES: any = [];

const COMPONENTS = [...PIPES];

const DIRECTIVES = [AutofocusDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES],
  providers: [...PIPES],
})
export class SharedModule { }
