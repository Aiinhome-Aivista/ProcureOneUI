import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankIdentityVerification } from './bank-identity-verification';

describe('BankIdentityVerification', () => {
  let component: BankIdentityVerification;
  let fixture: ComponentFixture<BankIdentityVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankIdentityVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankIdentityVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
