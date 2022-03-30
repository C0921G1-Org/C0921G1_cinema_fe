import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeFilm} from './type-film';
import {Film} from './film';



@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {
  //CaHM Api_Film
  API_Film ="http://localhost:8080/film";
  // CaHM API_FilmType
  API_FilmType ="http://localhost:8080/film/filmType";
  constructor(private httpClient: HttpClient) { }
// CaHM getList Film
  getAllFilm(){
    return this.httpClient.get(this.API_Film + "/list-management");
  }
  // CaHM them phim
  createFilm(film:Film){
    return this.httpClient.post(this.API_Film + "/createFilm",film )
  }
  //CaHM find Film theo id
  findByIdFilm(id: number){
    return this.httpClient.get(this.API_Film + "/findById/" + id)
  }
  //CaHM update Film
  updateFilm(id: number, film:any){
    return this.httpClient.patch(this.API_Film +"/"+ id,film )
  }
  //CaHM get List FilmType
  getAllFilmType():Observable<TypeFilm[]>{
    return this.httpClient.get<TypeFilm[]>(this.API_FilmType);
  }
}
