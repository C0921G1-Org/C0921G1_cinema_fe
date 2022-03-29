import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../service/member.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../model/Member";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-information-management',
  templateUrl: './member-information-management.component.html',
  styleUrls: ['./member-information-management.component.css']
})
export class MemberInformationManagementComponent implements OnInit {

  inforForm: FormGroup = new FormGroup({
    dateOfBirth: new FormControl(),
    email: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    identityNumber: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),

    address: new FormControl('', [Validators.required])

  });

  member: Member;
  errorMsg: string;

  constructor(private memberService: MemberService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id)
    this.memberService.findMemberById(id).subscribe(value => {
        this.member = value;
        console.log('value: '+value)
      },error => {},() => {
      this.inforForm.patchValue(this.member);
      console.log('day la gia tri form '+this.inforForm.value.name );
      }
    )


    // dateOfBirth: new FormControl(''),
    // email: new FormControl('',[Validators.required, this.soNguyenDuong]),
    // gender: new FormControl('',[Validators.required, Validators.pattern('^(KH-)[0-9]{4}$')]),
    // identityNumber: new FormControl('',[Validators.required,  Validators.pattern('[a-zA-z ]+')]),
    // image: new FormControl('',[Validators.required]),
    // name: new FormControl('',[Validators.required]),
    // phone: new FormControl('',[Validators.required,  Validators.pattern('^\\d{9,10}$')]),
    // point: new FormControl('',[Validators.required, Validators.pattern('^(84+|0)(90|91)[0-9]{7}$')]),


  }

  // submit() {
  //   const furamaService = this.serviceForm.value;
  //   console.log(furamaService);
  //   this.facilityService.updateService(furamaService).subscribe(value => {
  //     this.router.navigateByUrl('');
  //   });
  //
  // }

  submit() {

  }
}
