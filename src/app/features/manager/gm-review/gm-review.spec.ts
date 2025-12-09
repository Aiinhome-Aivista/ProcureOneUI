import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmReview } from './gm-review';

describe('GmReview', () => {
  let component: GmReview;
  let fixture: ComponentFixture<GmReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
