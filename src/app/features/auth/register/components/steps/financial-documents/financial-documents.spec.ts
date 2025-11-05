import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDocuments } from './financial-documents';

describe('FinancialDocuments', () => {
  let component: FinancialDocuments;
  let fixture: ComponentFixture<FinancialDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
