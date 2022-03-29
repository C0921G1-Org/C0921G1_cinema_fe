import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../../model/Transaction';


@Injectable({
  providedIn: 'root'
})
export class BookingManageService {
  private API_URL_BOOKING = 'http://localhost:8080/BookingTicket';

  constructor(private http: HttpClient) {
  }

  findAll(page: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL_BOOKING + '/List?page=' + page);
  }

  searchBookingTicket(pageable: number,code: string, name: string, member_id: string, phone: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL_BOOKING + '/Search?pageable=' + pageable + '&code=' + code + '&name=' + name + '&member_id=' + member_id + '&phone=' + phone);
  }
}
