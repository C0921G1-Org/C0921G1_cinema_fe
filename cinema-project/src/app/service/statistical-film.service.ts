import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticalFilmService {
  API_URL = 'http://localhost:8080/statistic/film';
  private listTopFilm: any;

  constructor(private httpClient: HttpClient) {
    this.listTopFilm = [];
  }

  getAllTopFilm(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL)
  }
}
