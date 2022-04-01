import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Film} from '../../model/film';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../security/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {

  film: Film;
  API_URL_LIST = 'http://localhost:8080/c09/user/film';
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
    return this.httpOptions;
  }

  public getListFilmClient(seeMore: number, page: number, startDate: string, name: string, statusFilm: string, typeFilm: string): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/list-client?seeMore=' + seeMore + '&page=' + page + '&startDate=' + startDate + '&name=' + name +
      '&statusFilm=' + statusFilm + '&typeFilm=' + typeFilm);
  }

  public getAllFilmList(): Observable<any> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/filmList', this.getHttpOptions());
  }

  public findById(id: number): Observable<Film> {
    return this.httpClient.get<Film>(this.API_URL_LIST + '/filmList/' + id);
  }

}
