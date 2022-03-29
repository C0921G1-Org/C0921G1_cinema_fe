import {Component, Inject, OnInit} from '@angular/core';
import {Member} from "./member";
import {City} from "./city";
import {District} from "./district";
import {Ward} from "./ward";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../service/city.service";
import {DistrictService} from "../../service/district.service";
import {WardService} from "../../service/ward.service";
import {Router} from "@angular/router";
import {AngularFireModule} from "@angular/fire";
import Swal from 'sweetalert2';
import {finalize} from "rxjs/operators";
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';

import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-member-account-registration',
  templateUrl: './member-account-registration.component.html',
  styleUrls: ['./member-account-registration.component.css']
})
export class MemberAccountRegistrationComponent implements OnInit {

  submitted=false;
  memberObj:Member;
  cityList:City[] = [];
  districtList:District[] = [];
  wardList:Ward[] = [];
  memberForm:FormGroup;
  selectedImage:any = "";
  cityObj:City;
  districtObj:District;
  constructor(private cityService:CityService,
              private districtService:DistrictService,
              private wardService:WardService,
              private memberService:MemberService,
              private router:Router,
              @Inject(AngularFireModule) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.cityService.getCityList().subscribe(city => {
      this.cityList = city;
      // console.log(city)
          this.memberForm = new FormGroup({
            image: new FormControl(''),
            name: new FormControl(''),
            phone: new FormControl(''),
            gender: new FormControl(''),
            email: new FormControl(''),

            passwordFormGroup: new FormGroup({
                password: new FormControl(''),
                confirmPassword:  new FormControl(''),
              }, this.comparePassword),

            city:  new FormControl(''),
            district:  new FormControl(''),
            ward:  new FormControl(''),
            address: new FormControl(''),
            dateOfBirth:  new FormControl(''),
            identityNumber: new FormControl(''),
            check: new FormControl('',[Validators.required,])
          })
        })
  }


  comparePassword(compare : AbstractControl): any{
    const validate = compare.value;
    return (validate.password === validate.confirmPassword)? null : {notMatch: true};
  }

  //get city NhanNT
  getCityToDistrictNhanNT(event: number): any{
    // console.log(event)
    // this.cityObj = event
    return this.districtService.getDistrictList(event).subscribe(district => {
      this.districtList = district;
    })
  }
  //get district  NhanNT
  getDistrictToWardNhanNT(event2: number): any{
    // console.log(event2)
    // this.districtObj = event2
    return this.wardService.getWardList(event2).subscribe(ward => {
      this.wardList = ward;
    })
  }

  //create member NhanNT
  onSubmit(){
    this.submitted = true;
// img upload
//     const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
//     const fileRef = this.storage.ref(nameImg)
//
//     this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
//       finalize(() => {
//         fileRef.getDownloadURL().subscribe((url) => {
//
//           this.memberForm.patchValue({img: url});

          // Call API to create vaccine
          if (this.memberForm.valid) {
            this.memberObj = Object.assign({}, this.memberForm.value);
              console.log(this.memberObj );
            this.memberService.createMember(this.memberObj).subscribe(()=>{
              Swal.fire(
                    'Create successfully!!!',
                    'Please check the values in List.',
                    'success'
              );
              this.router.navigateByUrl('');
            });
          }
    //
    //     });
    //   })
    // ).subscribe();
  }
  // img support NhanNT
  showPreview(event: any){
    this.selectedImage = event.target.files[0];
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
