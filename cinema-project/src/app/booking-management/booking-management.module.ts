import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingConfirmBookingTicketComponent } from './booking-confirm-booking-ticket/booking-confirm-booking-ticket.component';
import { BookingInformationBookingTicketComponent } from './booking-information-booking-ticket/booking-information-booking-ticket.component';
import { BookingSeatSelectionComponent } from './booking-seat-selection/booking-seat-selection.component';
import { BookingFilmSelectionComponent } from './booking-film-selection/booking-film-selection.component';
import { BookingBookingTicketListComponent } from './booking-booking-ticket-list/booking-booking-ticket-list.component';
import { BookingConfirmInformationBookingComponent } from './booking-confirm-information-booking/booking-confirm-information-booking.component';
import {BookingManagementRoutingModule} from "./booking-management-routing.module";



@NgModule({
  declarations: [BookingConfirmBookingTicketComponent, BookingInformationBookingTicketComponent, BookingSeatSelectionComponent, BookingFilmSelectionComponent, BookingBookingTicketListComponent, BookingConfirmInformationBookingComponent],
  imports: [
    CommonModule,
    BookingManagementRoutingModule
  ]
})
export class BookingManagementModule { }
