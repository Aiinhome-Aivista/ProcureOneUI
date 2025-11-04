import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFinancialDetails } from './bank-financial-details';

describe('BankFinancialDetails', () => {
  let component: BankFinancialDetails;
  let fixture: ComponentFixture<BankFinancialDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankFinancialDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankFinancialDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
