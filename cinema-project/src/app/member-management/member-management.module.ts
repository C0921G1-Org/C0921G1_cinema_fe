import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberAccountRegistrationComponent } from './member-account-registration/member-account-registration.component';
import { MemberBookingTicketManagementComponent } from './member-booking-ticket-management/member-booking-ticket-management.component';
import { MemberInformationManagementComponent } from './member-information-management/member-information-management.component';
import { MemberPointHistoryManagementComponent } from './member-point-history-management/member-point-history-management.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberAccountEditComponent } from './member-account-edit/member-account-edit.component';
import {MemberManagementRoutingModule} from "./member-management-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [MemberAccountRegistrationComponent, MemberBookingTicketManagementComponent, MemberInformationManagementComponent, MemberPointHistoryManagementComponent, MemberListComponent, MemberAccountEditComponent],
  exports: [
    MemberListComponent
  ],
  imports: [
    CommonModule,
    MemberManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule
  ]
})
export class MemberManagementModule { }
