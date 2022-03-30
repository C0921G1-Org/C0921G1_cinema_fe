import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {City} from "../../model/city";
import {MemberManagementService} from "../../service/member-management/member-management.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CityService} from "../../service/member-management/city.service";

@Component({
  selector: 'app-member-account-edit',
  templateUrl: './member-account-edit.component.html',
  styleUrls: ['./member-account-edit.component.css']
})
export class MemberAccountEditComponent implements OnInit {

  memberUpdateForm: FormGroup = new FormGroup({
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
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe(value => {
      this.cities = value;
      console.log(value);

      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
        this.getMemberById(this.id);
      })
    })
  }

  //get member by id - KhanhLDQ
  getMemberById(id: string) {
    return this.memberManagementService.getMemberById(id).subscribe(value => {
      this.memberUpdateForm.setValue(value);
      console.log(value);
    }, error => {
      console.log(error);
    })
  }

  updateMember() {

  }

}
