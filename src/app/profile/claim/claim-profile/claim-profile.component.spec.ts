import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProfileComponent } from './claim-profile.component';

describe('ClaimProfileComponent', () => {
  let component: ClaimProfileComponent;
  let fixture: ComponentFixture<ClaimProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
