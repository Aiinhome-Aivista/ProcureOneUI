import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidingStatus } from './biding-status';

describe('BidingStatus', () => {
  let component: BidingStatus;
  let fixture: ComponentFixture<BidingStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidingStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidingStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
