import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../member-management/member-account-registration/member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private API_URL = 'http://localhost:8080/member'
  constructor(private http:HttpClient) { }

  //create member NhanNT
  createMember(member: Member): Observable<Member> {
    console.log(member);
    return this.http.post<Member>(this.API_URL, member)
  }
}
