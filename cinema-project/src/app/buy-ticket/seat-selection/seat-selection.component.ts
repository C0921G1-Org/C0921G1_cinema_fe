import {Component, OnInit} from '@angular/core';
import {SharingDataService} from '../sharing-data.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  currentFilmChoose: number;
  constructor(private sharingDataService: SharingDataService) {
  }

  ngOnInit(): void {
    this.currentFilmChoose = this.sharingDataService.currentObj;
    console.log(this.currentFilmChoose);
    // this.getDataFromFirstComponent();
    // this.sharingDataService.sharedDataWithSecondComponent().subscribe(value => {
    //   this.currentFilmChoose = value;
    // });
    // console.log(this.currentFilmChoose);
  }

  // getDataFromFirstComponent(){
  //   this.sharingDataService.sharedDataWithSecondComponent().subscribe(value => {
  //     this.currentFilmChoose = value;
  //     console.log(value);
  //   });
  // }

}
