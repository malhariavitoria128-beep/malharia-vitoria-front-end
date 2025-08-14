import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutModule } from '../components/layout/layout-module';

@NgModule({
  declarations: [
    Home
  ],
  imports: [
    CommonModule,
    LayoutModule,
    PagesRoutingModule
  ],

})
export class PagesModule { }
