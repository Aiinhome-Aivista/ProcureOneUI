import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSubmission } from './final-submission';

describe('FinalSubmission', () => {
  let component: FinalSubmission;
  let fixture: ComponentFixture<FinalSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
