import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {
  API_Film ="http://localhost:8080/film";
  API_FilmType ="http://localhost:8080/film/filmType";
  constructor(private httpClient: HttpClient) { }

  getAllFilm(){
    return this.httpClient.get(this.API_Film);
  }
  createFilm(film:any){
    return this.httpClient.post(this.API_Film + "/createFilm",film )
  }
  findByIdFilm(id: number){
    return this.httpClient.get(this.API_Film + "/findByIdFilm/" + id)
  }
  updateFilm(id: number, film:any){
    return this.httpClient.put(this.API_Film +"/"+ id,film )
  }
  getAllFilmType(){
    return this.httpClient.get(this.API_FilmType);
  }
}
