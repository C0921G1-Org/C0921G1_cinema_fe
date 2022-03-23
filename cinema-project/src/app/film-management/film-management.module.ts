import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmManagementCreateComponent } from './film-management-create/film-management-create.component';
import { FilmManagementEditComponent } from './film-management-edit/film-management-edit.component';
import { FilmManagementListComponent } from './film-management-list/film-management-list.component';
import { FilmClientListComponent } from './film-client-list/film-client-list.component';
import { FilmClientFilmDetailComponent } from './film-client-film-detail/film-client-film-detail.component';
import { FilmManagementDeleteComponent } from './film-management-delete/film-management-delete.component';
import {FilmManagementRoutingModule} from "./film-management-routing.module";



@NgModule({
  declarations: [FilmManagementCreateComponent, FilmManagementEditComponent, FilmManagementListComponent, FilmClientListComponent, FilmClientFilmDetailComponent, FilmManagementDeleteComponent],
  imports: [
    CommonModule,
    FilmManagementRoutingModule
  ]
})
export class FilmManagementModule { }
