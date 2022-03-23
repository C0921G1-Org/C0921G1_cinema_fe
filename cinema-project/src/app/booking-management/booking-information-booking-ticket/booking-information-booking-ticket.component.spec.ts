import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingInformationBookingTicketComponent } from './booking-information-booking-ticket.component';

describe('BookingInformationBookingTicketComponent', () => {
  let component: BookingInformationBookingTicketComponent;
  let fixture: ComponentFixture<BookingInformationBookingTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingInformationBookingTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingInformationBookingTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
