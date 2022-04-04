import {Component, OnInit} from '@angular/core';
import {Film} from '../../model/film';
import {FilmServiceService} from '../../service/film/film-service.service';
import {ShowtimeService} from '../../service/buy-ticket/showtime.service';
import {SharingDataService} from '../sharing-data.service';
import * as moment from 'moment';
import {ShowTime} from "../../model/ShowTime";

@Component({
  selector: 'app-film-selection',
  templateUrl: './film-selection.component.html',
  styleUrls: ['./film-selection.component.css']
})
export class FilmSelectionComponent implements OnInit {
  filmList: Film[] = [];
  showTimeList: ShowTime[] = [];
  showTimeListNextDay: ShowTime[] = [];
  showTimeListNextTwoDay: ShowTime[] = [];
  filmCurrentChooseId: number;
  showTimeCurrentChoose: number;
  filmCurrentChooseObj: Film;
  showTimeCurrentChooseObj: ShowTime;
  weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
  monthList = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  today = moment().format('YYYY MM DD');
  currentDate: string;
  currentDay: string;
  currentMonth: string;
  currentNextDate: string;
  currentNextDay: string;
  currentNextMonth: string;
  currentNextTwoDate: string;
  currentNextTwoDay: string;
  currentNextTwoMonth: string;
  currentDateFull: string;
  nextDateFull: string;
  nextTwoDateFull: string;
  newDate: Date;
  private test: moment.Moment;

  constructor(private filmServiceService: FilmServiceService,
              private showtimeService: ShowtimeService,
              private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
    this.filmServiceService.getAllFilmList().subscribe(value => {
      this.filmList = value;
    });

    /*DatTC - Ngày chiếu phim hôm nay*/
    this.currentDay = this.weekday[moment(this.today).isoWeekday()];
    console.log('currentDay' + this.currentDay);
    this.currentDate = moment(this.today).format('DD');
    this.currentMonth = this.monthList[parseInt(moment(this.today).format('M')) - 1];

    /*DatTC - Ngày chiếu phim ngày mai*/
    this.currentNextDay = this.weekday[moment(this.today).add(1, 'days').isoWeekday()];
    console.log('currentNextDay' + this.currentNextDay);
    this.currentNextDate = moment(this.today).add(1, 'days').format('DD');
    this.currentNextMonth = this.monthList[parseInt(moment(this.today).add(1, 'days').format('M')) - 1];

    /*DatTC - Ngày chiếu phim ngày kia*/
    this.currentNextTwoDay = this.weekday[moment(this.today).add(2, 'days').isoWeekday()];
    // this.currentNextTwoDay = moment(this.today).add(2, 'days').isoWeekday();
    console.log('currentNext2Day' + this.currentNextTwoDay);
    this.currentNextTwoDate = moment(this.today).add(2, 'days').format('DD');
    this.currentNextTwoMonth = this.monthList[parseInt(moment(this.today).add(2, 'days').format('M')) - 1];
    console.log(typeof this.currentNextTwoMonth);

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
