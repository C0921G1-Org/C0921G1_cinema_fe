import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SelectedSeat} from '../../model/selected-seat';

@Injectable({
  providedIn: 'root'
})
export class SelectedSeatService {
  API_URL = 'http://localhost:8080/selectedSeat';

  constructor(private httpClient: HttpClient) {
  }

  public getAllSelectedSeatByShowTimeId(id: number): Observable<SelectedSeat[]> {
    return this.httpClient.get<SelectedSeat[]>(this.API_URL + '/' + id);
  }
}
