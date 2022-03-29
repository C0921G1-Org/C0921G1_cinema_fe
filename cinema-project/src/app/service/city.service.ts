import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../member-management/member-account-registration/city";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private API_URL = 'http://localhost:8080/member/city'
  constructor(private http:HttpClient) { }


  //get city list NhanNT
  getCityList(): Observable<City[]>{
    return this.http.get<City[]>(this.API_URL)
  }
}
