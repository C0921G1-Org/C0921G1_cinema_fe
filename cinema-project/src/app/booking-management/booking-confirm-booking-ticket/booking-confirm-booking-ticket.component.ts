import {Component, OnInit} from '@angular/core';
import {BookingManageService} from '../../service/booking-manage/booking-manage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction} from '../../model/Transaction';

@Component({
  selector: 'app-booking-confirm-booking-ticket',
  templateUrl: './booking-confirm-booking-ticket.component.html',
  styleUrls: ['./booking-confirm-booking-ticket.component.css']
})
export class BookingConfirmBookingTicketComponent implements OnInit {
  transaction: Transaction;
  id: number;

  constructor(private bookingManageService: BookingManageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    // console.log(this.id);
    this.bookingManageService.findById(this.id).subscribe(value => {
      this.transaction = value;
      // this.acceptTicket();
      // console.log(this.transaction.showTime.selectedSeat.seatType.name);
    })
  }

  acceptTicket(){
    this.bookingManageService.acceptTicket(this.transaction).subscribe();
  }

}
