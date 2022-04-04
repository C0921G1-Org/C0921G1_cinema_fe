import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Film} from "../../model/Film";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {
  film: Film;
  API_URL_LIST = 'http://localhost:8080/c09/public/film';

  constructor(private httpClient: HttpClient) {
  }

  public getListFilmClient(seeMore: number, page: number, actor: string, name: string, typeFilm: string, filmStatus: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_LIST + '/list-client?seeMore=' + seeMore + '&page=' + page + '&actor='
      + actor + '&name=' + name + '&typeFilm=' + typeFilm + '&filmStatus=' + filmStatus);
  }


}
