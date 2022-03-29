import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../model/Member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  GETMEMBER_INFOR_API = 'http://localhost:8080/member/getDetail';
  GAINED_POINT_URL = 'http://localhost:8080/member/viewHistory/gained/TV001?startDate=2022-05-05&endDate=2022-05-07&pageNo=0';

  constructor(private httpClient: HttpClient) {
  }

  findMemberById(id: string) {
    return this.httpClient.get<Member>(this.GETMEMBER_INFOR_API + '/' + id);
  }

}
