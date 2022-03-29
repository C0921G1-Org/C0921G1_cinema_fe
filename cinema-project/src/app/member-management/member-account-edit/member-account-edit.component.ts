import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {City} from "../../model/city";
import {MemberManagementService} from "../../service/member-management/member-management.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-member-account-edit',
  templateUrl: './member-account-edit.component.html',
  styleUrls: ['./member-account-edit.component.css']
})
export class MemberAccountEditComponent implements OnInit {

  memberForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    gender: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    point: new FormControl(),
    image: new FormControl(),
    dateOfBirth: new FormControl(),
    identityNumber: new FormControl(),
    city: new FormControl()
  });

  cities: City[];
  id: string;

  constructor(
    private memberManagementService: MemberManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
