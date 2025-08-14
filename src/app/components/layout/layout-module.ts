import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';



@NgModule({
  declarations: [
    Navbar
  ],
  imports: [
    CommonModule
  ],
    exports: [
    Navbar
  ]
})
export class LayoutModule { }
