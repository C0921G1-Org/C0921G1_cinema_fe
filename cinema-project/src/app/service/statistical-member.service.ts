import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticalMemberService {
  API_URL = 'http://localhost:8080/statistic/member';
  private listTopMember: any;

  constructor(private httpClient: HttpClient) {
    this.listTopMember = [];
  }

  getAllTopMember(quarter: string, year: string): Observable<any> {
    if (quarter == undefined && year == undefined) {
      console.log("trả về list đầy đủ")
      return this.httpClient.get<any>(this.API_URL)
    } else if (quarter == undefined && year != undefined) {
      console.log("tìm theo year")
      return this.httpClient.get<any>(this.API_URL + '?&year=' + year)
    } else
      console.log("tìm theo quarter và year")
    return this.httpClient.get<any>(this.API_URL + '?quarter=' + quarter + '&year=' + year)
  }

  getYear(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/year')
  }
}
