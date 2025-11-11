import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidingHistory } from './biding-history';

describe('BidingHistory', () => {
  let component: BidingHistory;
  let fixture: ComponentFixture<BidingHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidingHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidingHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
