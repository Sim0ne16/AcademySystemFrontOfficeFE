import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTrendRoutingModule } from './user-trend-routing.module';
import { UserTrendComponent } from './user-trend.component';
import {NgChartsModule} from "ng2-charts";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    UserTrendComponent
  ],
  imports: [
    CommonModule,
    UserTrendRoutingModule,
    NgChartsModule
  ]
})
export class UserTrendModule { }
