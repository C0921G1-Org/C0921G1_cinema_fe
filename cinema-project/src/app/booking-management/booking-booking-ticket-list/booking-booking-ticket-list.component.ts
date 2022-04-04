import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingManageService} from '../../service/booking-manage/booking-manage.service';
import {Transaction} from '../../model/Transaction';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-booking-booking-ticket-list',
  templateUrl: './booking-booking-ticket-list.component.html',
  styleUrls: ['./booking-booking-ticket-list.component.css']
})
export class BookingBookingTicketListComponent implements OnInit {
  message = '';
  pageable = 0;
  code = '';
  member_id = '';
  phone = '';
  name = '';
  totalPage: number;
  transaction: Transaction;
  transactions: Transaction[];
  keywordForm: FormGroup;

  constructor(private bookingManageService: BookingManageService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.keywordForm = this.fb.group({
      keyword: ''
    });
    this.transaction = new Transaction();
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    // this.bookingManageService.findAll(this.page).subscribe(value => {
    //   this.transactions = value['content'];
    //   this.totalPage = value['totalPages'];
    //   console.log(this.transactions);
    // });
    this.searchBookingTicket();
  }

  previousPage() {
    if (this.pageable <= this.totalPage) {
      this.pageable = this.pageable - 1;
    }
    this.bookingManageService.searchBookingTicket(this.pageable, this.name, this.code, this.member_id, this.phone).subscribe(data => {
      this.transactions = data['content'];
      // console.log('previousPage: ' + this.transactions.length);
    });
  }

  nextPage() {
    if (this.pageable <= this.totalPage) {
      this.pageable = this.pageable + 1;
    }
    this.bookingManageService.searchBookingTicket(this.pageable, this.name, this.code, this.member_id, this.phone).subscribe(data => {
      this.transactions = data['content'];
      // console.log('nextpage: ' + this.transactions.length);
    });
  }

  searchBookingTicket() {
    this.bookingManageService.searchBookingTicket(this.pageable, this.name, this.code, this.member_id, this.phone).subscribe(data => {
      if (data == null) {
        this.totalPage = 0;
        console.log(this.message);
      }
      this.transactions = data['content'];
      this.totalPage = data['totalPages'];
      // console.log(this.transactions.length);
    });
  }
}
