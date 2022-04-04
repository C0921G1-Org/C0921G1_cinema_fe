import { Component, OnInit } from '@angular/core';
import {SharingDataService} from '../sharing-data.service';
import {ShowTime} from "../../model/ShowTime";

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
  currentShowTimeObj: ShowTime;
  constructor(private sharingDataService: SharingDataService) { }

  ngOnInit(): void {
    this.sharingDataService.sharedDataWithSecondComponent().subscribe(value => {
      this.currentShowTimeObj = value;
    });
    this.sharingDataService.getDataFromFirstComponent(this.currentShowTimeObj);
  }

}
