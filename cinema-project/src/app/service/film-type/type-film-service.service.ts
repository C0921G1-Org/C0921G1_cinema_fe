import { Injectable } from '@angular/core';
import {Film} from "../../model/film";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilmType} from "../../model/film-type";

@Injectable({
  providedIn: 'root'
})
export class TypeFilmServiceService {
  filmType: FilmType;
  API_URL_LIST = 'http://localhost:8080/c09/user/film-type';

  constructor(private httpClient: HttpClient) {
  }

  public getListFilmTypeClient(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/list');
  }
}
