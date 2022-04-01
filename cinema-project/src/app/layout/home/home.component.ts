import {Component, OnInit} from '@angular/core';
import {LoadCssService} from '../../loadCss/load-css-service.service';
import {Film} from "../../model/film";
import {FilmServiceService} from "../../service/film/film-service.service";
import {FilmType} from "../../model/film-type";
import {TypeFilmServiceService} from "../../service/film-type/type-film-service.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {isFakeMousedownFromScreenReader} from "@angular/cdk/a11y";

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
  actor = '';
  name = '';
  statusFilm = '';
  typeFilm = '';
  seeMore = 8;
  flagMessageEmpty = false;
  status = '';
  flagStatusFilm = false;

  constructor(private filmService: FilmServiceService,
              private typeFilmServiceService: TypeFilmServiceService,
              private activatedRoute: ActivatedRoute) {
    this.film = new Film();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.status = params.get('status');
      if (this.status == '2') {
        this.statusFilm = '';
      } else if (this.status == '1') {
        this.statusFilm = '1';
      }
      this.getListFilmClient();
      this.getTypeFilmList();
    });
  }


  public getListFilmClient() {
    if (this.statusFilm === '') {
      this.flagStatusFilm = false;
    } else if (this.statusFilm === '1') {
      this.flagStatusFilm = true;
    }
    this.filmService.getListFilmClient(this.seeMore, this.page, this.actor, this.name, this.typeFilm, this.statusFilm).subscribe(value => {
      if (value != null) {
        this.flagMessageEmpty = true;
        this.filmClientList = [];
        this.flagMessageEmpty = false;
        this.filmClientList = value['content']
        this.totalPage = value['totalPages'];
      }
    }, error => {
      this.flagMessageEmpty = true;
      this.filmClientList = [];
    });
  }

  public getTypeFilmList() {
    this.typeFilmServiceService.getListFilmTypeClient().subscribe(value => {
      this.filmTypeClientList = value;
    });
  }

  nextPage() {
    this.seeMore += 8;
    console.log(this.seeMore);
    this.filmService.getListFilmClient(this.seeMore, this.page, this.actor, this.name, this.typeFilm, this.statusFilm).subscribe(data => {
      this.filmClientList = data['content'];
      this.totalPage = data['totalPages'];
    });
  }

  getSearchFilmType($event) {
    this.typeFilm = $event.target.value;
  }

}
