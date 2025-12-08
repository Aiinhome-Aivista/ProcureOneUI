import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegReview } from './vendor-reg-review';

describe('VendorRegReview', () => {
  let component: VendorRegReview;
  let fixture: ComponentFixture<VendorRegReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorRegReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorRegReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
