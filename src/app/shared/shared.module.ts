import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [AlertComponent, NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
