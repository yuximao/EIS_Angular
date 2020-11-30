import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInsuranceComponent } from './check-insurance.component';

describe('CheckInsuranceComponent', () => {
  let component: CheckInsuranceComponent;
  let fixture: ComponentFixture<CheckInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
