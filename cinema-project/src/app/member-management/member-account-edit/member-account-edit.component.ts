import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {City} from "../../model/city";
import {MemberManagementService} from "../../service/member-management/member-management.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CityService} from "../../service/member-management/city.service";
import {differenceInYears} from "date-fns";

@Component({
  selector: 'app-member-account-edit',
  templateUrl: './member-account-edit.component.html',
  styleUrls: ['./member-account-edit.component.css']
})
export class MemberAccountEditComponent implements OnInit {

  memberUpdateForm: FormGroup = new FormGroup({
    id: new FormControl(),

    name: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z ]+$"),
        Validators.minLength(8)])),

    gender: new FormControl(),

    // phone: new FormControl('',
    //   Validators.compose([Validators.required, Validators.pattern("^(\\(84\\)\\+|0)(90|91)(\\d){7}$")])),

    phone: new FormControl(),

    email: new FormControl('',
      Validators.compose([Validators.required, Validators.email])),

    address: new FormControl('',
      Validators.compose([Validators.required])),

    point: new FormControl(),

    image: new FormControl(),

    dateOfBirth: new FormControl('',
      Validators.compose([Validators.required, this.checkAgeMember])),

    identityNumber: new FormControl('',
      Validators.compose([Validators.required,
        Validators.pattern("^((\\d){9}|(\\d){12})$")])),

    city: new FormControl()
  });

  cities: City[];
  id: string;
  buttonFLag: boolean = false;
  errors: any;

  constructor(
    private memberManagementService: MemberManagementService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe(value => {
      this.cities = value;
      // console.log(value);

      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = paramMap.get('id');
        this.getMemberById(this.id);
      })
    })
  }

  //get member by id - KhanhLDQ
  getMemberById(id: string) {
    return this.memberManagementService.getMemberById(id).subscribe(value => {
      // console.log(value);
      this.memberUpdateForm.setValue(value);
      // console.log(this.memberUpdateForm);
    }, error => {
      console.log(error);
    })
  }

  //age member >= 16 or <= 100 - KhanhLDQ
  checkAgeMember(abstractControl: AbstractControl): any {
    const formValue = abstractControl.value;
    const now = new Date();
    const dateOfBirth = new Date(formValue);

    const years = differenceInYears(now,dateOfBirth);
    // console.log(years);

    return (years >= 16 && years <= 100) ? null : {notSuitableAge: true};
  }

  //update member by id - KhanhLDQ
  updateMember() {
    const member = this.memberUpdateForm.value;
    this.buttonFLag = true;
    // console.log(member);

    // if (this.memberUpdateForm.valid) {
    //   this.memberManagementService.updateMember(this.id,member).subscribe(() => {
    //     console.log('update member successfully!');
    //     this.router.navigateByUrl('/member/list').then(r => console.log('back to member list!'));
    //   }, error => {
    //     console.log(error);
    //   })
    // }

    //memberUpdateForm.valid => chi bat duoc validate tai front-end

    this.memberManagementService.updateMember(this.id,member).subscribe(() => {
      console.log('update member successfully!');
      this.router.navigateByUrl('/member/list').then(r => console.log('back to member list!'));

    }, error => {

      console.log(error.error);
      this.errors = error.error;

      for (let i = 0; i < this.errors.length; i++) {

        // console.log(this.errors[i].field);
        // console.log(this.errors[i].field == "phone");

        // if (this.errors[i].field == "phone" && this.errors[i].code == "Pattern") {
        //   document.getElementById("phone-pattern").textContent = this.errors[i].defaultMessage;
        // }

        // if (this.errors[i].field == "phone" && this.errors[i].code == "NotBlank") {
        //   document.getElementById("phone-not-blank").textContent = this.errors[i].defaultMessage;
        // }
      }
    })
  }
}
