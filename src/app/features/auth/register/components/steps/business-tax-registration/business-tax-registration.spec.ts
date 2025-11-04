import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTaxRegistration } from './business-tax-registration';

describe('BusinessTaxRegistration', () => {
  let component: BusinessTaxRegistration;
  let fixture: ComponentFixture<BusinessTaxRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTaxRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessTaxRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
