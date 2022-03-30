import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmServiceService} from "../../service/film/film-service.service";
import {Film} from "../../model/film";
import Swal from "sweetalert2";

@Component({
  selector: 'app-film-management-delete',
  templateUrl: './film-management-delete.component.html',
  styleUrls: ['./film-management-delete.component.css']
})
export class FilmManagementDeleteComponent implements OnInit {
  film: Film;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
               public dialogRef: MatDialogRef<FilmManagementDeleteComponent>,
              private filmServiceService: FilmServiceService) { }

  ngOnInit(): void {
    this.getFilm(this.data);
  }

  public getFilm(id: number){
    this.filmServiceService.getFilmManagement(id).subscribe(value => {
      this.film=value;
    })
  }

  public submit(id: number){
    this.filmServiceService.deleteFilmManagement(id).subscribe(value => {
      this.cancel();
      Swal.fire(
        'Đã xong thành công!',
        'Phim ' + this.film.name +' của hãng phim ' + this.film.studio,
        'success'
      )
    },error => {
      console.log(error);
    });

  }

  public cancel(){
    this.dialogRef.close();
  }
}
