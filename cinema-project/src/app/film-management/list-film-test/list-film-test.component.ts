import { Component, OnInit } from '@angular/core';
import {FilmServiceService} from '../film-service.service';

@Component({
  selector: 'app-list-film-test',
  templateUrl: './list-film-test.component.html',
  styleUrls: ['./list-film-test.component.css']
})
export class ListFilmTestComponent implements OnInit {
  listFilm: any;
  constructor(private filmService: FilmServiceService) { }

  ngOnInit(): void {
    this.filmService.getAllFilm().subscribe(value => {
      this.listFilm = value
    })
  }

}
