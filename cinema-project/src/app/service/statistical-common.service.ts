import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticalCommonService {
  API_URL = 'http://localhost:8080/statistic';
  private listTopFilm: any;
  private listTopMember: any;

  constructor(private httpClient: HttpClient) {
    this.listTopFilm = [];
    this.listTopMember = [];
  }

  getAllTopFilm(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/film')
  }

  getAllTopMember(quarter: string, year: string): Observable<any> {
    if (quarter == undefined && year == undefined) {
      console.log("trả về list đầy đủ")
      return this.httpClient.get<any>(this.API_URL+'/member')
    } else if (quarter == undefined && year != undefined) {
      console.log("tìm theo year")
      return this.httpClient.get<any>(this.API_URL + '/member' + '?&year=' + year)
    } else
      console.log("tìm theo quarter và year")
    return this.httpClient.get<any>(this.API_URL + '/member' + '?quarter=' + quarter + '&year=' + year)
  }

  getYear(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/member' + '/year')
  }

  getInforAdmin(id: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/common/'+id)
  }
  getRevenueByMonth(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/common/revenue')
  }
}
