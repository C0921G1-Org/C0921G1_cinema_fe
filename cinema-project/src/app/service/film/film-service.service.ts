import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Film} from '../../model/film';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {
  film: Film;
  API_URL_LIST = 'http://localhost:8080/c09/user/film';

  constructor(private httpClient: HttpClient) {
  }

  public getListFilmClient(seeMore: number, page: number, startDate: string, name: string, statusFilm: string, typeFilm: string): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/list-client?seeMore=' + seeMore + '&page=' + page + '&startDate=' + startDate + '&name=' + name +
      '&statusFilm=' + statusFilm + '&typeFilm=' + typeFilm);
  }

  public getAllFilmList(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.API_URL_LIST + '/filmList');
  }

  public findById(id: number): Observable<Film> {
    return this.httpClient.get<Film>(this.API_URL_LIST + '/filmList/' + id);
  }

  public findByIdFilm(id: number):Observable<Film>{
    return this.httpClient.get<Film>(this.API_URL_LIST  +"/findById/"+id);
  }

}
