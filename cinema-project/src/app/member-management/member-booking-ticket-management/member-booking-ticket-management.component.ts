import { Component, OnInit } from '@angular/core';
import {TradingHistory} from "./trading-history";
import {MatDialog} from "@angular/material/dialog";
import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-member-booking-ticket-management',
  templateUrl: './member-booking-ticket-management.component.html',
  styleUrls: ['./member-booking-ticket-management.component.css']
})
export class MemberBookingTicketManagementComponent implements OnInit {


  tradingHistoryList: TradingHistory[];
  tradingHistory: TradingHistory;

  p: number = 0;

  totalPagination: number;
  totalElement: number
  searchText: string = "";
  memberId: string = "Mem-002";

  constructor(
    // public dialog: MatDialog,
              public tradingHistoryService: MemberService,) { }

  ngOnInit(): void {
    this.getTradingHistory(this.p,this.memberId,this.searchText)
    // console.log("ok")
  }

  //NhanNT get trading history list
  getTradingHistory(page:number,id:string,name:string){
    this.tradingHistoryService.getTradingHistory(page,id,name).subscribe(value => {
      if(value === null){
        this.tradingHistoryList = [];
        this.totalPagination = 0;
        this.totalElement = 0;
      }
      else{
        this.tradingHistoryList = value['content'];
        this.totalPagination = value['totalPages'];
        this.totalElement = value['totalElements'];
      }
      // this.p = 0;
    })
  }
  nextPage() {
    if (this.p <= this.totalPagination) {
      this.p = this.p + 1;
    }
    this.getTradingHistory(this.p,this.memberId,this.searchText)
  }

  previousPage() {
    this.p = this.p - 1;
    if (this.p == 0 || this.p < 0) {
      this.p = 0;
      this.ngOnInit();
    } else {
      this.getTradingHistory(this.p,this.memberId,this.searchText)
    }
  }
  search(){
    this.ngOnInit();
  }
}
