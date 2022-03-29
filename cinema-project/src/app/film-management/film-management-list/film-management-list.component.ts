import { Component, OnInit } from '@angular/core';
import {Film} from "../../model/film";
import {FilmServiceService} from "../../service/film/film-service.service";
import {FilmManagementDeleteComponent} from "../film-management-delete/film-management-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";

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
  startDateFormat='';
  endDateFormat='';
  constructor(private filmServiceService: FilmServiceService,
              private dialog: MatDialog, private router: Router,
              private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.getFilmList();
  }

  public getFilmList(){
      this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDateFormat,this.endDateFormat).subscribe(value => {
      this.films = value['content'];
      this.totalPagination = value['totalPages'];
      this.totalElement = value['totalElements'];
      this.page = 0;
      console.log(this.startDateFormat);
      console.log(this.startDate);
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
    this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDateFormat,this.endDateFormat).subscribe(data => {
      this.films = data['content'];
      this.page=0;
    });
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.page == 0 || this.page < 0) {
      this.page = 0;
      this.ngOnInit();
    } else {
      this.filmServiceService.getListFilmManagement(this.page,this.name,this.startDateFormat,this.endDateFormat).subscribe(data => {
        this.films = data['content'];
        this.page=0;
      })
    }
  }

  search(){
    if(this.startDate != null){
      this.startDateFormat = new Date(this.startDate).toLocaleDateString('fr-CA');
    }else {
      this.startDateFormat = '';
    }
    if (this.endDate !=null){
      this.endDateFormat = new Date(this.endDate).toLocaleDateString('fr-CA');
    }else {
      this.endDateFormat ='';
    }

    this.getFilmList();
  }

}
