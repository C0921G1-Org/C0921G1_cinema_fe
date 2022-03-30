import { Component, OnInit } from '@angular/core';
import {Showtime} from '../../model/showtime';
import {SharingDataService} from '../sharing-data.service';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
  currentShowTimeObj: Showtime;
  constructor(private sharingDataService: SharingDataService) { }

  ngOnInit(): void {
    this.sharingDataService.sharedDataWithSecondComponent().subscribe(value => {
      this.currentShowTimeObj = value;
    });
    this.sharingDataService.getDataFromFirstComponent(this.currentShowTimeObj);
  }

}
