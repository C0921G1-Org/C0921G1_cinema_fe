import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmManagementCreateComponent} from './film-management-create/film-management-create.component';
import {FilmManagementEditComponent} from './film-management-edit/film-management-edit.component';
import {FilmManagementListComponent} from './film-management-list/film-management-list.component';
import {FilmClientFilmDetailComponent} from './film-client-film-detail/film-client-film-detail.component';
import {FilmManagementDeleteComponent} from './film-management-delete/film-management-delete.component';
import {FilmManagementRoutingModule} from "./film-management-routing.module";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
  declarations: [FilmManagementCreateComponent, FilmManagementEditComponent, FilmManagementListComponent, FilmClientFilmDetailComponent, FilmManagementDeleteComponent],
  imports: [
    CommonModule,
    FilmManagementRoutingModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class FilmManagementModule {
}
