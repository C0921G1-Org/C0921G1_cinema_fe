import {Component, OnInit} from '@angular/core';
import {Film} from '../../model/film';
import {FilmServiceService} from '../../service/film/film-service.service';
import {ShowtimeService} from '../../service/buy-ticket/showtime.service';
import {Showtime} from '../../model/showtime';
import {SharingDataService} from '../sharing-data.service';

@Component({
  selector: 'app-film-selection',
  templateUrl: './film-selection.component.html',
  styleUrls: ['./film-selection.component.css']
})
export class FilmSelectionComponent implements OnInit {
  filmList: Film[] = [];
  showTimeList: Showtime[] = [];
  showTimeListNextDay: Showtime[] = [];
  showTimeListNextTwoDay: Showtime[] = [];
  filmCurrentChooseId: number;
  showTimeCurrentChoose: number;
  filmCurrentChooseObj: Film;
  showTimeCurrentChooseObj: Showtime;
  weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  monthList = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  currentDate: number;
  currentDay: string;
  currentMonth: string;
  currentNextDate: number;
  currentNextDay: string;
  currentNextTwoDate: number;
  currentNextTwoDay: string;
  currentDateFull: string;
  nextDateFull: string;
  nextTwoDateFull: string;
  private newDate: Date;

  constructor(private filmServiceService: FilmServiceService,
              private showtimeService: ShowtimeService,
              private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
    this.filmServiceService.getAllFilmList().subscribe(value => {
      this.filmList = value;
    });

    /*DatTC - Ngày chiếu phim hôm nay*/
    this.currentDay = this.weekday[new Date().getDay()];
    this.currentDate = new Date().getDate();
    this.currentMonth = this.monthList[new Date().getMonth()];

    /*DatTC - Ngày chiếu phim ngày mai*/
    this.currentNextDay = this.weekday[new Date().getDay() + 1];
    this.currentNextDate = new Date().getDate() + 1;

    /*DatTC - Ngày chiếu phim ngày kia*/
    this.currentNextTwoDay = this.weekday[new Date().getDay() + 2];
    this.currentNextTwoDate = new Date().getDate() + 2;

    /*DatTC - Ngày chiếu phim ngày mai & ngày kia theo string YYYY-MM-DD*/
    this.currentDateFull = new Date().toISOString().slice(0, 10);
    this.nextDateFull = this.changeDate(1);
    this.nextTwoDateFull = this.changeDate(2);
  }


  /*DatTC - Lấy dữ liệu showtime khi User chọn film*/
  getFilmId(id: number) {
    this.filmServiceService.findById(id).subscribe(value => {
      this.filmCurrentChooseObj = value;
      this.filmCurrentChooseId = this.filmCurrentChooseObj.id;
    });

    /*Lấy showtime của film theo ngày thứ 1*/
    this.showtimeService.getShowTimeByFilmId(id, this.currentDateFull).subscribe(value => {
      this.showTimeList = value;
    });

    /*Lấy showtime của film theo ngày thứ 2*/
    this.showtimeService.getShowTimeByFilmId(id, this.nextDateFull).subscribe(value => {
      this.showTimeListNextDay = value;
    });

    /*Lấy showtime của film theo ngày thứ 3*/
    this.showtimeService.getShowTimeByFilmId(id, this.nextTwoDateFull).subscribe(value => {
      this.showTimeListNextTwoDay = value;
    });

  }

  getShowTimeId(id: number) {
    this.showtimeService.findById(id).subscribe(value => {
      this.showTimeCurrentChooseObj = value;
    });
    this.showTimeCurrentChoose = id;
  }

  /*DatTC - Function tăng ngày theo string*/
  changeDate(numberDay: number): string {
    this.newDate = new Date();
    this.newDate.setDate(this.newDate.getDate() + numberDay);
    return this.newDate.toISOString().slice(0, 10);
  }
}
