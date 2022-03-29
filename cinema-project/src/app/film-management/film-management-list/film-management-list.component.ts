import { Component, OnInit } from '@angular/core';
import {Film} from "../../model/film";
import {FilmServiceService} from "../../service/film/film-service.service";
import {FilmManagementDeleteComponent} from "../film-management-delete/film-management-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-film-management-list',
  templateUrl: './film-management-list.component.html',
  styleUrls: ['./film-management-list.component.css']
})
export class FilmManagementListComponent implements OnInit {
  films: Film[];
  page = 0;
  name = '';
  startDate='';
  endDate= '';
  totalPagination: number;
  totalElement: number
  constructor(private filmServiceService: FilmServiceService,
              private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getFilmList();
  }

  public getFilmList(){
    this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDate,this.endDate).subscribe(value => {
      this.films = value['content'];
      this.totalPagination = value['totalPages'];
      this.totalElement = value['totalElements'];
      this.page = 0;
    });
  }

  public openDialog(id: number): void{
    const dialogRef = this.dialog.open(FilmManagementDeleteComponent, {
      width: 'max-content',
      height: 'max-content',
      data: id,

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

    });
  }

  nextPage() {
    if (this.page <= this.totalPagination) {
      this.page = this.page + 1;
    }
    this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDate,this.endDate).subscribe(data => {
      this.films = data['content'];
    });
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.page == 0 || this.page < 0) {
      this.page = 0;
      this.ngOnInit();
    } else {
      this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDate,this.endDate).subscribe(data => {
        this.films = data['content'];
      })
    }
  }

  search(){
    this.getFilmList();
  }

}
