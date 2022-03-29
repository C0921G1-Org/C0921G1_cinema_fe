import {Component, OnInit} from '@angular/core';
import firebase from "firebase";
import Transaction = firebase.firestore.Transaction;
import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-member-point-history-management',
  templateUrl: './member-point-history-management.component.html',
  styleUrls: ['./member-point-history-management.component.css']
})
export class MemberPointHistoryManagementComponent implements OnInit {

  p: number = 1;
  transactionList: Transaction[];
  transaction: Transaction;

  constructor(private memberService: MemberService,) {
  }

  ngOnInit(): void {
  }
}
