import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiReview } from './ai-review';

describe('AiReview', () => {
  let component: AiReview;
  let fixture: ComponentFixture<AiReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
