import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmClientFilmDetailComponent} from './film-client-film-detail/film-client-film-detail.component';
import {FilmManagementCreateComponent} from './film-management-create/film-management-create.component';
import {FilmManagementDeleteComponent} from './film-management-delete/film-management-delete.component';
import {FilmManagementEditComponent} from './film-management-edit/film-management-edit.component';
import {FilmManagementListComponent} from './film-management-list/film-management-list.component';


const routes: Routes = [
  {
    path: 'detail-client/:id', component: FilmClientFilmDetailComponent,
  },

  {
    path: 'create', component: FilmManagementCreateComponent
  },
  {
    path: 'delete/:id', component: FilmManagementDeleteComponent
  },
  {
    path: 'edit/:id', component: FilmManagementEditComponent
  },
  {
    path: 'list-manager', component: FilmManagementListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmManagementRoutingModule {
}
