import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionBiddingViewpage } from './requisition-bidding-viewpage';

describe('RequisitionBiddingViewpage', () => {
  let component: RequisitionBiddingViewpage;
  let fixture: ComponentFixture<RequisitionBiddingViewpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitionBiddingViewpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionBiddingViewpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
