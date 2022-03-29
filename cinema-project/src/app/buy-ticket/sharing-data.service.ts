import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  currentObj: number;
  public subject = new Subject<number>();
  getDataFromFirstComponent(x: number){
    this.subject.next(x);
  }
  sharedDataWithSecondComponent(){
    this.subject.asObservable().subscribe(value => {
      this.currentObj = value;
    });
  }

  constructor() { }
}
