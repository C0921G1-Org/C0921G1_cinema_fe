import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmClientFilmDetailComponent} from "./film-client-film-detail/film-client-film-detail.component";
import {FilmClientListComponent} from "./film-client-list/film-client-list.component";
import {FilmManagementCreateComponent} from "./film-management-create/film-management-create.component";
import {FilmManagementDeleteComponent} from "./film-management-delete/film-management-delete.component";
import {FilmManagementEditComponent} from "./film-management-edit/film-management-edit.component";
import {FilmManagementListComponent} from "./film-management-list/film-management-list.component";



const routes: Routes = [
  {
    path: 'list-detail-client', component: FilmClientFilmDetailComponent
  },
  {
    path: 'list-client', component: FilmClientListComponent
  },
  {
    path: 'create', component: FilmManagementCreateComponent
  },
  {
    path: 'delete/:id', component: FilmManagementDeleteComponent
  },
  {
    path: 'edit/:id', component:FilmManagementEditComponent
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
