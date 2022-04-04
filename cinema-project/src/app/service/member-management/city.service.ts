import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../../model/city";

const connect_backend_url = 'http://localhost:8080/c09/admin/member-management';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) { }

  //get all cities - KhanhLDQ
  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(connect_backend_url + '/city-list');
  }
}
