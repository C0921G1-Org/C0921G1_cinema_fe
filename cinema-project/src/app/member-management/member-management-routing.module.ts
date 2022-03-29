import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MemberAccountEditComponent} from "./member-account-edit/member-account-edit.component";
import {MemberAccountRegistrationComponent} from "./member-account-registration/member-account-registration.component";
import {MemberBookingTicketManagementComponent} from "./member-booking-ticket-management/member-booking-ticket-management.component";
import {MemberInformationManagementComponent} from "./member-information-management/member-information-management.component";
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberPointHistoryManagementComponent} from "./member-point-history-management/member-point-history-management.component";


const routes: Routes = [
  {
    path: 'edit-account/:id', component: MemberAccountEditComponent
  },
  {
    path: 'registration-account', component: MemberAccountRegistrationComponent
  },
  {
    path: 'Booking-ticket', component: MemberBookingTicketManagementComponent
  },
  {
    path: 'info-member/:id', component: MemberInformationManagementComponent
  },
  {
    path: 'list', component: MemberListComponent
  },
  {
    path: 'history-point', component: MemberPointHistoryManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberManagementRoutingModule {
}
