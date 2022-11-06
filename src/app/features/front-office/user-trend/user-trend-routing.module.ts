import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserTrendComponent} from './user-trend.component';

const routes: Routes = [
    {path: '', component: UserTrendComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserTrendRoutingModule {
}
