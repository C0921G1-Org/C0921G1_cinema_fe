import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilmServiceService} from '../film-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-film-management-create',
  templateUrl: './film-management-create.component.html',
  styleUrls: ['./film-management-create.component.css']
})
export class FilmManagementCreateComponent implements OnInit {
    formFilm: FormGroup;
    film: any;
    fimTypeList:any;

  constructor(private filmService: FilmServiceService,
              private router : Router) {
    this.filmService.getAllFilmType().subscribe(value => {
      this.fimTypeList = value;
      console.log(this.fimTypeList)
    })
    this.formFilm = new FormGroup({
      name: new FormControl(""),
     duration:new FormControl(""),
      startDate:new FormControl(""),
      endDate:new FormControl(""),
      filmType: new FormControl(""),
      actor:new FormControl(""),
      director:new FormControl(""),
      studio: new FormControl(""),
      image: new FormControl(""),
      trailer: new FormControl(""),
      version: new FormControl(""),
      flagDelete: new FormControl("")
    })
  }

  ngOnInit(): void {

  }

  create(value: any) {
    this.filmService.createFilm(value).subscribe(() =>{
this.router.navigateByUrl("film/list-film-test")
    })
  }
}
