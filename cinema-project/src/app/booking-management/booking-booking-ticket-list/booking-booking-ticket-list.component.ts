import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookingManageService} from '../../service/booking-manage/booking-manage.service';
import {Transaction} from '../../model/Transaction';
import {FormBuilder, FormGroup} from '@angular/forms';
import {log} from 'util';



@Component({
  selector: 'app-booking-booking-ticket-list',
  templateUrl: './booking-booking-ticket-list.component.html',
  styleUrls: ['./booking-booking-ticket-list.component.css']
})
export class BookingBookingTicketListComponent implements OnInit {
  pageable=1;
  code= '';
  member_id ='';
  phone ='';
  name = '';
  page = 0;
  totalPage: number;
  transaction: Transaction;
  transactions: Transaction[];
  keywordForm: FormGroup;

  constructor(private bookingManageService: BookingManageService,
              private router: Router,
              private fb: FormBuilder) {
    this.keywordForm = this.fb.group({
      keyword: ''
    });
    this.transaction = new Transaction();
  }

  ngOnInit(): void {
    // this.bookingManageService.findAll(this.page).subscribe(value => {
    //   this.transactions = value['content'];
    //   this.totalPage = value['totalPages'];
    //   console.log(this.transactions);
    // });
    this.searchBookingTicket();
  }

  previousPage() {
    if (this.page <= this.totalPage) {
      this.page = this.page - 1;
    }
    this.bookingManageService.searchBookingTicket(this.pageable, this.name, this.code,  this.member_id, this.phone).subscribe(data => {
      this.transactions = data['content'];
    });
  }

  nextPage() {
    if (this.page <= this.totalPage) {
      this.page = this.page + 1;
    }
    this.bookingManageService.searchBookingTicket(this.pageable, this.name, this.code,  this.member_id, this.phone).subscribe(data => {
      this.transactions = data['content'];
    });
  }

  searchBookingTicket(){
    this.bookingManageService.searchBookingTicket(this.pageable, this.name, this.code,  this.member_id, this.phone).subscribe(data =>

    {
      console.log(this.name);
      this.transactions = data['content']
      this.totalPage = data['totalPages'];
      console.log(this.transactions);
    })
  }

  search(){
    // this.bookingManageService.findAll(this.page);
  }

  // searchBookingTicket(value: any) {
  //   console.log('hello  ' + value);
  //   this.keywordForm.controls.keyword.patchValue(value);
  //   this.ngOnInit();
  // }
}
