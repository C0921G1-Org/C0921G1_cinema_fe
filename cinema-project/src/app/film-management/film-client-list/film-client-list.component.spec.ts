import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmClientListComponent } from './film-client-list.component';

describe('FilmClientListComponent', () => {
  let component: FilmClientListComponent;
  let fixture: ComponentFixture<FilmClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
