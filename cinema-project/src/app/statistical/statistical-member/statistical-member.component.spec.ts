import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalMemberComponent } from './statistical-member.component';

describe('StatisticalMemberComponent', () => {
  let component: StatisticalMemberComponent;
  let fixture: ComponentFixture<StatisticalMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
