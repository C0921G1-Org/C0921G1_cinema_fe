import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FilmServiceService} from '../film-service.service';
import {Router} from '@angular/router';
import {TypeFilm} from '../type-film';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {Message} from '../message';




@Component({
  selector: 'app-film-management-create',
  templateUrl: './film-management-create.component.html',
  styleUrls: ['./film-management-create.component.css']
})
export class FilmManagementCreateComponent implements OnInit {
    formFilm: FormGroup;
    film: any;
    fimTypeList: TypeFilm[];
    filmTypeNew = [];

  private selectedImage: any;

  constructor(private filmService: FilmServiceService,
              private router : Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private message: Message ) {

  }

  ngOnInit(): void {

    this.filmService.getAllFilmType().subscribe(value => {
      this.fimTypeList = value;
      console.log(this.fimTypeList)
    })
    this.formFilm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      duration:new FormControl("",[Validators.required]),
      startDate:new FormControl("",[Validators.required]),
      endDate:new FormControl("",[Validators.required]),
     filmType: new FormControl(null),
      actor:new FormControl("",[Validators.required,Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
      director:new FormControl("",[Validators.required,Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
      studio: new FormControl("",[Validators.required]),
      image: new FormControl(""),
      trailer: new FormControl("",[Validators.required]),
      version: new FormControl("",[Validators.required]),
      filmTypeNew: new FormControl("")

    })

  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

// bat checkbox
  onChangeFood(event) {
    console.log(event);
    this.filmTypeNew.push(event)
    console.log(this.filmTypeNew)
  }

  create() {

    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {

        //set mang vao typeFilmNew

        this.formFilm.patchValue({filmTypeNew : this.filmTypeNew.toString()})
        //  down link và path vào image
        fileRef.getDownloadURL().subscribe((url) => {
          this.formFilm.patchValue({image: url});
          // Call API to create Customer
          console.log(this.formFilm.value)
          this.filmService.createFilm(this.formFilm.value).subscribe(()=>{

            this.router.navigateByUrl("/film/list-film-test").then(r => this.message.showMessage("Thêm mới thành công!"));
          });

        });
      })
    ).subscribe();

  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}


