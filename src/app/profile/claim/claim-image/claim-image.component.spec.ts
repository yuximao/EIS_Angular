import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimImageComponent } from './claim-image.component';

describe('ClaimImageComponent', () => {
  let component: ClaimImageComponent;
  let fixture: ComponentFixture<ClaimImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
