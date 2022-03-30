import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmSelectionComponent } from './film-selection/film-selection.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import {BuyTicketRoutingModule} from './buy-ticket-routing.module';
import { TempComponent } from './temp/temp.component';



@NgModule({
  declarations: [FilmSelectionComponent, SeatSelectionComponent, TempComponent],
  exports: [
    FilmSelectionComponent
  ],
  imports: [
    CommonModule,
    BuyTicketRoutingModule
  ]
})
export class BuyTicketModule { }
