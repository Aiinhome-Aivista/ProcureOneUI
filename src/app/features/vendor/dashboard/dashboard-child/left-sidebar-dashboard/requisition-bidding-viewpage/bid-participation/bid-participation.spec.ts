import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidParticipation } from './bid-participation';

describe('BidPariticpation', () => {
  let component: BidParticipation;
  let fixture: ComponentFixture<BidParticipation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidParticipation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidParticipation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
