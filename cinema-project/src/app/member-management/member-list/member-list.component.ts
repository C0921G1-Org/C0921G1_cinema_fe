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

  //pagination variables - KhanhLDQ
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

      console.log('no search');

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

  //search params - KhanhLDQ
  pointArr: string[];
  firstValue: number;
  secondValue: number;

  totalPageSearch: number;
  currentPageSearch: number = 0;
  totalMemberSearch: number;
  currentMemberSearch: number;

  buttonSearchFlag: boolean = false;

  memberName: string = "";
  pointRange: string;

  //search members by name and point range - KhanhLDQ
  searchMembers() {
    // console.log(this.memberName);
    // console.log(this.pointRange);

    this.pointArr = this.pointRange.split("-");
    // console.log(this.pointArr);

    this.firstValue = Number(this.pointArr[0]);
    this.secondValue = Number(this.pointArr[1]);

    // console.log(this.firstValue);
    // console.log(this.secondValue);

    this.buttonSearchFlag = true;

    if (this.currentPageSearch != 0)
      this.currentPageSearch = 0;

    console.log('search');
    // console.log(this.currentPageSearch);

    this.memberManagementService.
      searchMembersByNameAndPointRange(this.currentPageSearch,this.memberName,this.firstValue,this.secondValue).subscribe(value => {
        this.members = value['content'];
        this.totalPageSearch = value['totalPages'];
        this.currentPageSearch = value['number'];
        this.totalMemberSearch = value['totalElements'];
        this.currentMemberSearch = value['numberOfElements'];

        // console.log(this.totalPageSearch);
        // console.log(this.currentPageSearch);
        // console.log(this.totalMemberSearch);
        // console.log(this.currentMemberSearch);

        console.log(value);
    }, error => {
        console.log(error);
    })


  }

  moveToPreviousPageSearch() {
    this.currentPageSearch -= 1;

    // console.log(this.currentPageSearch);
    // console.log(this.memberName);
    // console.log(this.pointRange);

    // console.log(this.firstValue);
    // console.log(this.secondValue);
    // console.log(this.memberName);

    this.buttonSearchFlag = true;
    this.memberManagementService.
      searchMembersByNameAndPointRange(this.currentPageSearch,this.memberName,this.firstValue,this.secondValue).subscribe(value => {
      this.members = value['content'];
      this.totalPageSearch = value['totalPages'];
      this.currentPageSearch = value['number'];
      this.totalMemberSearch = value['totalElements'];
      this.currentMemberSearch = value['numberOfElements'];

      console.log(value);
    }, error => {
        console.log(error);
    })
  }

  moveToNextPageSearch() {
    this.currentPageSearch += 1;

    // console.log(this.currentPageSearch);
    // console.log(this.memberName);
    // console.log(this.pointRange);

    // console.log(this.firstValue);
    // console.log(this.secondValue);
    // console.log(this.memberName);

    this.buttonSearchFlag = true;
    this.memberManagementService.
    searchMembersByNameAndPointRange(this.currentPageSearch,this.memberName,this.firstValue,this.secondValue).subscribe(value => {
      this.members = value['content'];
      this.totalPageSearch = value['totalPages'];
      this.currentPageSearch = value['number'];
      this.totalMemberSearch = value['totalElements'];
      this.currentMemberSearch = value['numberOfElements'];

      console.log(value);
    }, error => {
      console.log(error);
    })
  }





}
