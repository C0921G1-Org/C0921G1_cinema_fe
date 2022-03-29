import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {District} from "../member-management/member-account-registration/district";

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private API_URL = 'http://localhost:8080/member/district'
  constructor(private http:HttpClient) { }

  //get district list NhanNT
  getDistrictList(): Observable<District[]>{
    return this.http.get<District[]>(this.API_URL)
  }
}
