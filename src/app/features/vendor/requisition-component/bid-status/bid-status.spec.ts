import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidStatus } from './bid-status';

describe('BidStatus', () => {
  let component: BidStatus;
  let fixture: ComponentFixture<BidStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
