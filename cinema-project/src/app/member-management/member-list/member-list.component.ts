import { Component, OnInit } from '@angular/core';
import {MemberManagementService} from "../../service/member-management/member-management.service";
import {Member} from "../../model/member";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];

  //pagination variables
  totalPage: number;
  currentPage: number = 0;
  totalMember: number;
  currentMember: number;

  constructor(
    private memberManagementService: MemberManagementService
  ) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberManagementService.getAllMembers(this.currentPage).subscribe(value => {
      //set values for those variables
      this.members = value['content'];
      this.totalPage = value['totalPages']
      this.currentPage = value['number'];
      this.totalMember = value['totalElements'];
      this.currentMember = value['numberOfElements'];

      console.log(value);
      // console.log(this.currentPage);
      // console.log(this.totalPage);
    }, error => {
      console.log(error);
    })
  }

  //move to previous page - KhanhLDQ
  moveToPreviousPage() {
    this.currentPage -= 1;
    this.ngOnInit();
  }

  //move to next page - KhanhLDQ
  moveToNextPage() {
    this.currentPage += 1;
    this.ngOnInit();
  }

}
