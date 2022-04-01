import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatisticalCommonManagementComponent} from "./statistical-common-management/statistical-common-management.component";
import {StatisticalFilmComponent} from "./statistical-film/statistical-film.component";
import {StatisticalMemberComponent} from "./statistical-member/statistical-member.component";



const routes: Routes = [
  {
    path: 'common', component: StatisticalCommonManagementComponent,
  },
  {
    path: 'film', component: StatisticalFilmComponent
  },
  {
    path: 'member', component: StatisticalMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule {
}
