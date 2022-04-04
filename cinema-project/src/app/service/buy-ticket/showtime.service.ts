import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Showtime} from '../../model/showtime';
import {TokenStorageService} from "../security/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  API_URL = 'http://localhost:8080/c09/user/';
  httpOptions: any;
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  public getHttpOptions(): any {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
    return this.httpOptions;
  }

  public getShowTimeByFilmId(filmId: number, date: string): Observable<any> {
    return this.httpClient.get<Showtime[]>(this.API_URL + 'showtime/by-film?filmId=' + filmId + '&date=' + date, this.getHttpOptions());
  }

  public findById(id: number): Observable<any>{
    return this.httpClient.get<Showtime>(this.API_URL + 'showtime/' + id, this.getHttpOptions());
  }
}
