import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../shared/material-design.module';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialDesignModule];

const PIPES: any = [];

const COMPONENTS = [...PIPES];

const DIRECTIVES: any = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES],
  providers: [...PIPES]
})
export class SharedModule { }
