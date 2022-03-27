import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";

// router nhiều chỗ còn thiếu tham số, ai cần gì thì tự thêm vô rồi làm nhé(trong routing của module con ấy)
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'statistical',
    loadChildren: () => import('./statistical/statistical.module').then(module => module.StatisticalModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member-management/member-management.module').then(module => module.MemberManagementModule)
  },
  {
    path: 'film',
    loadChildren: () => import('./film-management/film-management.module').then(module => module.FilmManagementModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking-management/booking-management.module').then(module => module.BookingManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
