import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalCommonManagementComponent } from './statistical-common-management.component';

describe('StatisticalCommonManagementComponent', () => {
  let component: StatisticalCommonManagementComponent;
  let fixture: ComponentFixture<StatisticalCommonManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalCommonManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalCommonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
