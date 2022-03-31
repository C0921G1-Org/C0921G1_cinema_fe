import { Component, OnInit } from '@angular/core';
import {TypeFilmServiceService} from "../../service/film-type/type-film-service.service";

@Component({
  selector: 'app-booking-booking-ticket-list',
  templateUrl: './booking-booking-ticket-list.component.html',
  styleUrls: ['./booking-booking-ticket-list.component.css']
})
export class BookingBookingTicketListComponent implements OnInit {

  constructor(private typeFilmServiceService : TypeFilmServiceService) { }

  ngOnInit(): void {
    this.typeFilmServiceService.getBooking().subscribe(
      () =>{
        console.log("vaofoo??");
      },
      () =>{
        console.log("ko vào đc?");
      }
    )
  }

}
