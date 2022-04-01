import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {AuthService} from "../../service/security/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../service/security/share.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 *  TuNK
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  username: string;
  errorMessage = false;
  roles: string[] = [];
  returnUrl: string;

  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private shareService: ShareService,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );

    // if (this.tokenStorageService.getToken()) {
    //   const user = this.tokenStorageService.getUser();
    //   this.authService.isLoggedIn = true;
    //   this.roles = this.tokenStorageService.getUser().roles;
    //   this.username = this.tokenStorageService.getUser().username;
    // }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      data => {
        if (this.formGroup.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserSession(data);
        }

        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.closeDialog();


        // this.formGroup.reset();
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();
      },
      err => {
        this.authService.isLoggedIn = false;
        this.errorMessage = true;
        this.formGroup.reset();
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
