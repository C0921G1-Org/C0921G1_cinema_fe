import { Component, OnInit } from '@angular/core';
import {TradingHistory} from "./trading-history";
import {MatDialog} from "@angular/material/dialog";
import {MemberService} from "../../service/member.service";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {log} from "util";

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
  memberId: string ;
  // memberId: string = "TV-0004";

  constructor(

              public tradingHistoryService: MemberService,
              private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {

    this.memberId = this.tokenStorageService.getUser().member.id;

    console.log(this.memberId);
    // console.log("===============================")
    this.getTradingHistory(this.p,this.memberId,this.searchText);
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
        // console.log(this.tradingHistoryList)
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
    this.p = 0;
    this.ngOnInit();
  }
}
