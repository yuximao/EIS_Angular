import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckClaimComponent } from './check-claim.component';

describe('CheckClaimComponent', () => {
  let component: CheckClaimComponent;
  let fixture: ComponentFixture<CheckClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
