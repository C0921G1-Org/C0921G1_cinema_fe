import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFilmSelectionComponent } from './booking-film-selection.component';

describe('BookingFilmSelectionComponent', () => {
  let component: BookingFilmSelectionComponent;
  let fixture: ComponentFixture<BookingFilmSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingFilmSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFilmSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
