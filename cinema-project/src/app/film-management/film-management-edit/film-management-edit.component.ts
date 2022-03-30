import {Component, Inject, OnInit} from '@angular/core';
import {FilmServiceService} from '../film-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Film} from '../film';
import {TypeFilm} from '../type-film';
import {AngularFireStorage} from '@angular/fire/storage';
import {Message} from '../message';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import index from '@angular/cli/lib/cli';


@Component({
  selector: 'app-film-management-edit',
  templateUrl: './film-management-edit.component.html',
  styleUrls: ['./film-management-edit.component.css']
})
export class FilmManagementEditComponent implements OnInit {
  fimTypeList: TypeFilm[];
  film: Film;
  id: number;
  private i: any;
  filmTypeNewArr = [];
  private filmTypeNew = [];
  private selectedImage: any;

    formFilm: FormGroup = new FormGroup({
      id: new FormControl(""),
    name: new FormControl("",[Validators.required]),
    duration:new FormControl("",[Validators.required]),
    startDate:new FormControl("",[Validators.required]),
    endDate:new FormControl("",[Validators.required]),
    filmType: new FormControl("null"),
    actor:new FormControl("",[Validators.required,Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
    director:new FormControl("",[Validators.required,Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
    studio: new FormControl("",[Validators.required]),
    image: new FormControl(""),
    trailer: new FormControl("",[Validators.required]),
    version: new FormControl("",[Validators.required]),
    filmTypeNew: new FormControl(""),
    flagDelete: new FormControl(""),

  });



  constructor(private filmService: FilmServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private message: Message) {
  }


  ngOnInit(): void {
    this.filmService.getAllFilmType().subscribe(value => {
      this.fimTypeList = value;
      console.log(this.fimTypeList);

      this.id = this.activatedRoute.snapshot.params.id
      this.filmService.getAllFilmType().subscribe(value => {
        this.fimTypeList = value;
        this.filmService.findByIdFilm(this.id).subscribe(value1 => {
// console.log(value1)
          this.formFilm.setValue(value1);

          // for (this.i = 0; this.i < this.formFilm.value.filmTypeNew
          //   .replace().split(",").length; this.i++) {
          //   this.filmTypeNewArr.push(index[this.i])
          //   // }
          //   console.log(this.filmTypeNewArr)
          //   // this.formFilm.patchValue({filmTypeNew: this.filmTypeNewArr})
          // }
        });


      })


    })
  }
// bat checkbox
  onChangeFood(event) {
    this.filmTypeNew.push(event + " ");
  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  // getCurrentDateTime(): string {
  //   return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  // }
  getCurrentDataTime(): string{
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }


  update(id: number,value: any) {
    const nameImg = this.getCurrentDataTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg,this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{


        fileRef.getDownloadURL().subscribe((url)=>{
          this.formFilm.patchValue({image:url});
          this.filmService.updateFilm(id,value).subscribe()
        });
      })
    )
  }



}
