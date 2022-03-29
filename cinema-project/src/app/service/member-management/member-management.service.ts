import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../../model/member";

const connect_backend_url = 'http://localhost:8080/c09/admin/member-management';

@Injectable({
  providedIn: 'root'
})
export class MemberManagementService {

  constructor(
    private http: HttpClient
  ) { }

  //get all members - KhanhLDQ
  getAllMembers(page: number): Observable<Member[]> {
    return this.http.get<Member[]>(connect_backend_url + '/member-list?page=' + page);
  }

  //get member by id - KhanhLDQ
  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(connect_backend_url + '/member-list/info/' + id);
  }

}
