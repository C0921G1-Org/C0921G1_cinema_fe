import {Component, OnInit} from '@angular/core';
import {LoadCssService} from '../../loadCss/load-css-service.service';
import {Film} from "../../model/film";
import {FilmServiceService} from "../../service/film/film-service.service";
import {FilmType} from "../../model/film-type";
import {TypeFilmServiceService} from "../../service/film-type/type-film-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  film: Film;
  filmClientList: Film[] = new Array();
  filmTypeClientList: FilmType[] = new Array();
  page = 0;
  totalPage: number;
  startDate = '';
  name = '';
  statusFilm = '';
  typeFilm = '';
  seeMore = 6;

  constructor(private filmService: FilmServiceService,
              private typeFilmServiceService: TypeFilmServiceService) {
    this.film = new Film();
  }

  ngOnInit(): void {
    this.getListFilmClient();
    this.getTypeFilmList();
  }


  public getListFilmClient() {
    this.filmService.getListFilmClient(this.seeMore, this.page, this.startDate, this.name, this.statusFilm, this.typeFilm).subscribe(value => {
      this.filmClientList = value['content'];
      this.totalPage = value['totalPages'];
    });
  }

  public getTypeFilmList() {
    this.typeFilmServiceService.getListFilmTypeClient().subscribe(value => {
      this.filmTypeClientList = value;
    });
  }

  nextPage() {
    this.seeMore += 6;
    console.log(this.seeMore);
    this.filmService.getListFilmClient(this.seeMore, this.page, this.startDate, this.name, this.statusFilm, this.typeFilm).subscribe(data => {
      this.filmClientList = data['content'];
      this.totalPage = data['totalPages'];
    });
  }

  getSearchFilmType($event) {
    this.typeFilm = $event.target.value;
  }

}