import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidingPerformanceGraph } from './biding-performance-graph';

describe('BidingPerformanceGraph', () => {
  let component: BidingPerformanceGraph;
  let fixture: ComponentFixture<BidingPerformanceGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidingPerformanceGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidingPerformanceGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
