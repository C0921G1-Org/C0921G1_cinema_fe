import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Showtime} from '../model/showtime';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  API_URL = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  public getShowTimeByFilmId(filmId: number, date: string): Observable<Showtime[]> {
    return this.httpClient.get<Showtime[]>(this.API_URL + 'showtime/by-film?filmId=' + filmId + '&date=' + date);
  }
}
