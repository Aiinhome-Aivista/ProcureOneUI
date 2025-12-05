import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionDetails } from './requisition-details';

describe('RequisitionDetails', () => {
  let component: RequisitionDetails;
  let fixture: ComponentFixture<RequisitionDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitionDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
