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

  //get all members with pagination - KhanhLDQ
  getAllMembers(page: number): Observable<Member[]> {
    return this.http.get<Member[]>(connect_backend_url + '/member-list?page=' + page);
  }

  //get member by id - KhanhLDQ
  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(connect_backend_url + '/member-list/info/' + id);
  }

  //update member by id - KhanhLDQ
  updateMember(id: string, member: Member): Observable<Member> {
    return this.http.patch<Member>(connect_backend_url + '/member-list/update/' + id, member);
  }

  //search members by name and point range - KhanhLDQ
  searchMembersByNameAndPointRange(page: number, name: string, firstValue: number, secondValue: number): Observable<Member[]> {
    return this.http.get<Member[]>(connect_backend_url +
      '/member-list/search-point-range?page=' + page + '&name=' + name + '&firstValue=' + firstValue + '&secondValue=' + secondValue);
  }

  //search members by name and point default - KhanhLDQ
  searchMembersByNameAndPointDefault(page: number, name: string): Observable<Member[]> {
    return this.http.get<Member[]>(connect_backend_url +
      '/member-list/search-point-default?page=' + page + '&name=' + name);
  }

}
