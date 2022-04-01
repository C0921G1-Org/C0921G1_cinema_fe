import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberAccountRegistrationComponent } from './member-account-registration/member-account-registration.component';
import { MemberBookingTicketManagementComponent } from './member-booking-ticket-management/member-booking-ticket-management.component';
import { MemberInformationManagementComponent } from './member-information-management/member-information-management.component';
import { MemberPointHistoryManagementComponent } from './member-point-history-management/member-point-history-management.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberAccountEditComponent } from './member-account-edit/member-account-edit.component';
import {MemberManagementRoutingModule} from "./member-management-routing.module";



@NgModule({
  declarations: [MemberAccountRegistrationComponent, MemberBookingTicketManagementComponent, MemberInformationManagementComponent, MemberPointHistoryManagementComponent, MemberListComponent, MemberAccountEditComponent],
  imports: [
    CommonModule,
    MemberManagementRoutingModule
  ]
})
export class MemberManagementModule { }
