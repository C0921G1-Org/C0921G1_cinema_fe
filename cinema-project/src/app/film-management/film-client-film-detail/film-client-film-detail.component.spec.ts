import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmClientFilmDetailComponent } from './film-client-film-detail.component';

describe('FilmClientFilmDetailComponent', () => {
  let component: FilmClientFilmDetailComponent;
  let fixture: ComponentFixture<FilmClientFilmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmClientFilmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmClientFilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
