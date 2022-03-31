import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../member-management/member-account-registration/member";
import {TradingHistory} from "../member-management/member-booking-ticket-management/trading-history";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private API_URL = 'http://localhost:8080/c09'
  constructor(private http:HttpClient) { }

  //create member NhanNT
  createMember(member: Member): Observable<void> {
    // console.log(member);
    return this.http.post<void>(this.API_URL+'/public/member', member)
  }

  //get historyList NhanNT
  getTradingHistory(page:number,id:string,name:string): Observable<TradingHistory[]>{
    return this.http.get<TradingHistory[]>(this.API_URL+'/user/member/history?'+'page='+page+'&memberID='+id+'&filmName='+name);
  }
}
