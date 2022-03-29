import {Component, OnInit} from '@angular/core';
import {Film} from '../../model/film';
import {FilmServiceService} from '../../service/film/film-service.service';
import {ShowtimeService} from '../../showtime/showtime.service';
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
  filmCurrentChoose: number;
  showTimeCurrentChoose: number;
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
    console.log(this.currentDay);
    this.currentDate = new Date().getDate();
    console.log(this.currentDate);
    this.currentMonth = this.monthList[new Date().getMonth()];
    console.log(this.currentMonth);

    /*DatTC - Ngày chiếu phim ngày mai*/
    this.currentNextDay = this.weekday[new Date().getDay() + 1];
    console.log(this.currentNextDay);
    this.currentNextDate = new Date().getDate() + 1;
    console.log(this.currentNextDate);

    /*DatTC - Ngày chiếu phim ngày kia*/
    this.currentNextTwoDay = this.weekday[new Date().getDay() + 2];
    console.log(this.currentNextTwoDay);
    this.currentNextTwoDate = new Date().getDate() + 2;
    console.log(this.currentNextTwoDate);

    /*DatTC - Ngày chiếu phim ngày mai & ngày kia theo string YYYY-MM-DD*/
    this.currentDateFull = new Date().toISOString().slice(0, 10);
    console.log(this.currentDateFull);
    this.nextDateFull = this.changeDate(1);
    console.log(this.nextDateFull);
    this.nextTwoDateFull = this.changeDate(2);
    console.log(this.nextTwoDateFull);
  }


  /*DatTC - Lấy dữ liệu showtime khi User chọn film*/
  getFilmId(id: number) {
    this.filmCurrentChoose = id;
    console.log(id);

    this.showtimeService.getShowTimeByFilmId(id, this.currentDateFull).subscribe(value => {
      this.showTimeList = value;
      console.log(value);
    });
    this.showtimeService.getShowTimeByFilmId(id, this.nextDateFull).subscribe(value => {
      this.showTimeListNextDay = value;
      console.log(value);
    });
    this.showtimeService.getShowTimeByFilmId(id, this.nextTwoDateFull).subscribe(value => {
      this.showTimeListNextTwoDay = value;
      console.log(value);
    });

  }

  getShowTimeId(id: number) {
    this.showTimeCurrentChoose = id;
  }

  /*DatTC - Function tăng ngày theo string*/
  changeDate(numberDay: number): string {
    this.newDate = new Date();
    this.newDate.setDate(this.newDate.getDate() + numberDay);
    return this.newDate.toISOString().slice(0, 10);
  }

  /*Send Data*/
  sendDataOutOfComponent() {
    this.sharingDataService.getDataFromFirstComponent(this.filmCurrentChoose);
    console.log(this.filmCurrentChoose);
  }

  nextStep() {
    this.sendDataOutOfComponent();
  }
}
