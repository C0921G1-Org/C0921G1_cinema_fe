import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalFilmComponent } from './statistical-film.component';

describe('StatisticalFilmComponent', () => {
  let component: StatisticalFilmComponent;
  let fixture: ComponentFixture<StatisticalFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
