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
import * as firebase from 'firebase/app';
import {MemberService} from "../../service/member.service";
import validate = WebAssembly.validate;
import {emailVerified} from "@angular/fire/auth-guard";


@Component({
  selector: 'app-member-account-registration',
  templateUrl: './member-account-registration.component.html',
  styleUrls: ['./member-account-registration.component.css']
})
export class MemberAccountRegistrationComponent implements OnInit {

  submitted = false;
  memberObj: Member;
  cityList: City[] = [];
  districtList: District[] = [];
  wardList: Ward[] = [];
  memberForm: FormGroup;
  selectedImage: any = "";
  cityObj: City;
  districtObj: District;

  errors: any;

  constructor(private cityService: CityService,
              private districtService: DistrictService,
              private wardService: WardService,
              private memberService: MemberService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {

    this.cityService.getCityList().subscribe(city => {
      this.cityList = city;
      // console.log(city)

      this.memberForm = new FormGroup({
        image: new FormControl('', [Validators.required,]),
        name: new FormControl('', [Validators.required,]),
        phone: new FormControl('', [Validators.required, Validators.pattern("\\(?(0[1-9]{2})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})")]),
        gender: new FormControl('', [Validators.required,]),
        email: new FormControl('', [Validators.required]),

        passwordFormGroup: new FormGroup({
          password: new FormControl('', [Validators.required,]),
          confirmPassword: new FormControl('', [Validators.required,]),
        }, this.comparePassword),

        cityThis: new FormControl(''),
        district: new FormControl(''),
        ward: new FormControl('', [Validators.required,]),
        address: new FormControl('', [Validators.required,]),
        dateOfBirth: new FormControl('', [Validators.required,]),
        identityNumber: new FormControl('', [Validators.required,]),
        check: new FormControl('', [Validators.required,])
      })
    })
    // console.log(this.memberForm.value.gender);
  }

  //NhanNT check password
  comparePassword(compare: AbstractControl): any {
    const validate = compare.value;
    // console.log(validate.password + "ok");
    return (validate.password === validate.confirmPassword) ? null : {notMatch: true};
  }

  //NhanNT check exist
  // checkExist(abstract: AbstractControl): any {
  //
  //   const validateExist = abstract.value;
  //
  //   this.memberService.checkExist(validateExist).subscribe(value => {
  //     if (value === null) {
  //       return null;
  //     } else {
  //       return {"existEmail": true};
  //     }
  //
  //   })
  //
  // }

  //get city NhanNT
  getCityToDistrictNhanNT(event: number): any {

    return this.districtService.getDistrictList(event).subscribe(district => {
      this.districtList = district;
    })
  }

  //get district  NhanNT
  getDistrictToWardNhanNT(event2: number): any {

    return this.wardService.getWardList(event2).subscribe(ward => {
      this.wardList = ward;
    })
  }

  //create member NhanNT
  onSubmit() {
    this.submitted = true;

// img upload
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;

    const fileRef = this.storage.ref(nameImg);

    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.memberForm.patchValue({image: url});

          // Call API to create vaccine
          if (this.memberForm.valid) {
            this.memberObj = Object.assign({}, this.memberForm.value);
            this.memberObj.cityId = this.memberForm.value.cityThis;


            this.memberObj.password = this.memberForm.value.passwordFormGroup.password;


            this.memberService.createMember(this.memberObj).subscribe(() => {
              Swal.fire(
                'Tạo Thành Công!!!',
                'Bạn có thể đăng nhập.',
                'success'
              );
              this.router.navigateByUrl('');
            }
            , error => {

              // console.log(error);
              // console.log(error.error);
              this.errors = error.error;
                // console.log(this.errors.get("emailDup"))
                // if (this.errors.length===0){
                //   document.getElementById("email-duplicate").textContent = "Tài khoản đã tồn tại";
                // }
                // else {
                  for (let i = 0; i < this.errors.length; i++) {
                    console.log("ok")
                    if (this.errors[i].field == "dateOfBirth") {
                      document.getElementById("checkAge").textContent = this.errors[i].defaultMessage;
                    }
                    if (this.errors[i].field == "existedEmail") {

                      document.getElementById("email-duplicate").textContent = this.errors[i].defaultMessage;
                    }

                  }
                // }

            }
            );
          }

        });
      })
    ).subscribe();


  }

  // img support NhanNT
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }
}
