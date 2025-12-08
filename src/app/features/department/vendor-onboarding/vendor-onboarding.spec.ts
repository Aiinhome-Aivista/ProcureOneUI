import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOnboarding } from './vendor-onboarding';

describe('VendorOnboarding', () => {
  let component: VendorOnboarding;
  let fixture: ComponentFixture<VendorOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
