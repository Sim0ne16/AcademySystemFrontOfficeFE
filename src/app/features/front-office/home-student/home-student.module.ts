import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeStudentRoutingModule } from './home-student-routing.module';
import { HomeStudentComponent } from './home-student.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeStudentComponent
  ],
    imports: [
        CommonModule,
        HomeStudentRoutingModule,
        ReactiveFormsModule,

    ],
  exports:[HomeStudentComponent]
})
export class HomeStudentModule { }
