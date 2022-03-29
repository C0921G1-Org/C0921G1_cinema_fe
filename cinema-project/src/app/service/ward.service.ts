import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ward} from "../member-management/member-account-registration/ward";

@Injectable({
  providedIn: 'root'
})
export class WardService {
  private API_URL = 'http://localhost:8080/member/ward'
  constructor(private http:HttpClient) { }

  //get ward list NhanNT
  getWardList(): Observable<Ward[]>{
    return this.http.get<Ward[]>(this.API_URL)
  }
}
