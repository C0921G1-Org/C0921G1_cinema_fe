import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookingBookingTicketListComponent} from "./booking-booking-ticket-list/booking-booking-ticket-list.component";
import {BookingConfirmBookingTicketComponent} from "./booking-confirm-booking-ticket/booking-confirm-booking-ticket.component";
import {BookingConfirmInformationBookingComponent} from "./booking-confirm-information-booking/booking-confirm-information-booking.component";
import {BookingSeatSelectionComponent} from "./booking-seat-selection/booking-seat-selection.component";
import {BookingFilmSelectionComponent} from "./booking-film-selection/booking-film-selection.component";
import {BookingInformationBookingTicketComponent} from "./booking-information-booking-ticket/booking-information-booking-ticket.component";


const routes: Routes = [
  {
    path: 'list', component: BookingBookingTicketListComponent
  },
  {
    path: 'confirm-booking', component: BookingConfirmBookingTicketComponent
  },
  {
    path: 'confirm-info-booking', component: BookingConfirmInformationBookingComponent
  },
  {
    path: 'info-booking', component: BookingInformationBookingTicketComponent
  },
  {
    path: 'film-select/:id', component: BookingFilmSelectionComponent
  },
  {
    path: 'seat-select', component: BookingSeatSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule {
}
