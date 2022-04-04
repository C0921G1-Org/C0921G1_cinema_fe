import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from '../../model/film';
import {Transaction} from '../../model/Transaction';
import {TokenStorageService} from '../security/token-storage.service';




@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  httpOptions: any;

          API_URL_LIST = 'http://localhost:8080/c09/user/';
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  public payment(transaction: Transaction): Observable<any>{
    return this.http.post<Transaction>(this.API_URL_LIST  + "pay" , transaction,this.httpOptions);
  }

  // public findById(id: number): Observable<Transaction>{
  //   return this.http.get<Transaction>(this.API_URL_LIST  + "findById/" + id);
  // }
}
