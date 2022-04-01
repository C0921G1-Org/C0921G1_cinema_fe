import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from '../../model/film';
import {Transaction} from '../../model/Transaction';




@Injectable({
  providedIn: 'root'
})
export class PaymentService {
          API_URL_LIST = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }



  public payment(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(this.API_URL_LIST  + "pay" , transaction);
  }

  public findById(id: number): Observable<Transaction>{
    return this.http.get<Transaction>(this.API_URL_LIST  + "findById/" + id);
  }
}
