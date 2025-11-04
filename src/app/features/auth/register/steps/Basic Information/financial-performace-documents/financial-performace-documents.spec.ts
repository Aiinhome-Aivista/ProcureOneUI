import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPerformaceDocuments } from './financial-performace-documents';

describe('FinancialPerformaceDocuments', () => {
  let component: FinancialPerformaceDocuments;
  let fixture: ComponentFixture<FinancialPerformaceDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialPerformaceDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialPerformaceDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
