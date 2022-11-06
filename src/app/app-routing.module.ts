import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from "./shared/consts/AppRoutes";

const routes: Routes = [
  {path:AppRoutes.Home,loadChildren: () => import ('./features/front-office/home-student/home-student.module').then(m => m.HomeStudentModule)},
  {path:'',redirectTo:AppRoutes.Home, pathMatch: 'full'},
  {path:'**',redirectTo:AppRoutes.Home, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
