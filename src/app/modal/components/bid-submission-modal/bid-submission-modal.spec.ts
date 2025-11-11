import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSubmissionModal } from './bid-submission-modal';

describe('BidSubmissionModal', () => {
  let component: BidSubmissionModal;
  let fixture: ComponentFixture<BidSubmissionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidSubmissionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidSubmissionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
