import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FilmSelectionComponent} from './film-selection/film-selection.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';

const routes: Routes = [
  {
    path: '', component: FilmSelectionComponent
  },
  {
    path: 'seat-selection', component: SeatSelectionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BuyTicketRoutingModule { }
