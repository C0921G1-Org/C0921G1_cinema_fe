import {Component, OnChanges, OnInit, Renderer2} from '@angular/core';
import {SharingDataService} from '../sharing-data.service';
import {Showtime} from '../../model/showtime';
import {SelectedSeatService} from '../../service/buy-ticket/selected-seat.service';
import {SelectedSeat} from '../../model/selected-seat';
import {ActivatedRoute} from '@angular/router';
import {ShowtimeService} from '../../service/buy-ticket/showtime.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import Swal from 'sweetalert2';
import {SeatTypeService} from '../../service/buy-ticket/seat-type.service';
import {SeatType} from '../../model/seat-type';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit, OnChanges {
  currentShowTimeChooseObj: Showtime;
  selectedSeatList: SelectedSeat[] = [];
  seatList = [];
  seatMapRow = 10;
  seatMapColumn = 5;
  totalSeat = this.seatMapRow * this.seatMapColumn;
  seat: { id: number; status: boolean };
  seatMap = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'];
  totalPayment = 0;
  seatChoosenList = [];
  comboNumber = 0;
  orderDetailSeatNumber = 0;
  count = 0;
  memberId: string;
  economySeat: SeatType;
  commonSeat: SeatType;
  VIPSeat: SeatType;
  countEconomySeat = [];
  countCommonSeat = [];
  countVIPSeat = [];
  errorPromoCode: boolean;
  combo = {id: 1, name: 'Combo Bắp + Nước', price: 85000};


  constructor(private sharingDataService: SharingDataService,
              private selectedSeatService: SelectedSeatService,
              private showtimeService: ShowtimeService,
              private activatedRoute: ActivatedRoute,
              private seatTypeService: SeatTypeService,
              private tokenStorageService: TokenStorageService) {
  }

  public showContent = false;

  ngOnInit(): void {
    this.seatTypeService.findById(3).subscribe(value => {
      this.economySeat = value;
    });
    this.seatTypeService.findById(2).subscribe(value => {
      this.commonSeat = value;

    });
    this.seatTypeService.findById(1).subscribe(value => {
      this.VIPSeat = value;

    });
    this.memberId = this.tokenStorageService.getUser().member;
    const id = this.activatedRoute.snapshot.params.id;
    this.showtimeService.findById(id).subscribe(value => this.currentShowTimeChooseObj = value);
    this.selectedSeatService.getAllSelectedSeatByShowTimeId(id).subscribe(value1 => {
      this.selectedSeatList = value1;
      this.createSeat(this.totalSeat);
      this.updateSeat();
      console.log(this.selectedSeatList);
      console.log(this.seatList);
    }, error => {
      this.createSeat(this.totalSeat);
    });
    setTimeout(() => {
      this.showContent = true;
    }, 0);
  }

  ngOnChanges() {
  }

  createSeat(quantity: number) {
    console.log(this.selectedSeatList);
    for (let i = 0; i < quantity; i++) {
      this.seat = {
        id: i + 1,
        status: false
      };
      this.seatList.push(this.seat);
    }
  }

  updateSeat() {
    console.log(this.selectedSeatList);
    for (let i = 0; i < this.seatList.length; i++) {
      for (let j = 0; j < this.selectedSeatList.length; j++) {
        if (this.seatList[i].id === this.selectedSeatList[j].seatPosition) {
          this.seatList[i].status = true;
        }
      }
    }
  }

  getSeat(seatObj: any) {
    const nonActive = this.count < this.orderDetailSeatNumber && !seatObj.active;
    const active = this.count <= this.orderDetailSeatNumber && seatObj.active;
    if (this.orderDetailSeatNumber === 0) {
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 500,
        heightAuto: true,
        icon: 'error',
        title: 'Vui lòng chọn số lượng vé trước khi chọn ghế',

        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
    if (!seatObj.status) {
      if (nonActive || active) {
        if (nonActive) {
          this.count++;
        } else {
          this.count--;
        }
        seatObj.active = !seatObj.active;
        if (seatObj.active) {
          this.seatChoosenList.push(seatObj.id);
          if (seatObj.id <= 20) {
            this.totalPayment += this.economySeat.price;
            this.countEconomySeat.push(this.economySeat);
            console.log(this.countEconomySeat);
          }
          if (seatObj.id > 20 && seatObj.id <= 40) {
            this.totalPayment += this.commonSeat.price;
            this.countCommonSeat.push(this.commonSeat);
          }
          if (seatObj.id > 40 && seatObj.id <= 50) {
            this.totalPayment += this.VIPSeat.price;
            this.countVIPSeat.push(this.VIPSeat);
          }
        } else {
          this.seatChoosenList.splice(this.seatChoosenList.indexOf(seatObj.id), 1);
          if (seatObj.id <= 20) {
            this.totalPayment -= this.economySeat.price;
            this.countEconomySeat.splice(0, 1);
            console.log(this.countEconomySeat);
          }
          if (seatObj.id > 20 && seatObj.id <= 40) {
            this.totalPayment -= this.commonSeat.price;
            this.countCommonSeat.splice(0, 1);
          }
          if (seatObj.id > 40 && seatObj.id <= 50) {
            this.totalPayment -= this.VIPSeat.price;
            this.countVIPSeat.splice(0, 1);
          }
        }
        console.log(this.seatChoosenList);
      }
    }
  }

  plusTicket() {
    this.orderDetailSeatNumber += 1;
  }

  minusTicket() {
    if (this.orderDetailSeatNumber > 0 && this.count < this.orderDetailSeatNumber) {
      this.orderDetailSeatNumber -= 1;
    }
  }

  minusCombo() {
    if (this.comboNumber > 0) {
      this.comboNumber -= 1;
      this.totalPayment -= 75000;
    }
  }

  plusCombo() {
    this.comboNumber += 1;
    this.totalPayment += 75000;
  }

  transferPayment() {
    const transferObj = {
      showtime: this.currentShowTimeChooseObj,
      seatChoose: this.seatChoosenList,
      totalPayment: this.totalPayment,
      member: this.tokenStorageService.getUser().member
    };
    console.log(transferObj.showtime);
    this.sharingDataService.getDataFromFirstComponent(transferObj);
    console.log(transferObj);
  }

  promotion(code: any) {
    if (code === 'C0921G1') {
      if (this.totalPayment > 50000) {
        this.totalPayment -= 50000;
        this.errorPromoCode = false;
      }
    } else {
      this.errorPromoCode = true;

    }
  }
}



