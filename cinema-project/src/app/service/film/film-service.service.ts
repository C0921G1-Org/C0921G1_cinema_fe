import {Injectable} from '@angular/core';

import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Film} from '../../model/film';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {

  film: Film;
  API_URL_LIST = 'http://localhost:8080/c09/public/film';

  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {

  }

  public getHttpOptions(): any {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public getListFilmClient(seeMore: number, page: number, actor: string, name: string, typeFilm: string, filmStatus: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_LIST + '/list-client?seeMore=' + seeMore + '&page=' + page + '&actor='
      + actor + '&name=' + name + '&typeFilm=' + typeFilm + '&filmStatus=' + filmStatus);
  }

  public getAllFilmList(): Observable<any> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/filmList');
  }

  public findById(id: number): Observable<any> {
    // return this.httpClient.get<Film>(this.API_URL_LIST + '/filmList/' + id, this.getHttpOptions());
    //
    return this.httpClient.get<Film>(this.API_URL_LIST + '/filmList/' + id);
  }

  public findByIdFilm(id: number):Observable<Film>{
    return this.httpClient.get<Film>(this.API_URL_LIST  +"/findById/"+id);
  }

}
