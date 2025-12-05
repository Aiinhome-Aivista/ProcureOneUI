import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSteps } from './preview-steps';

describe('PreviewSteps', () => {
  let component: PreviewSteps;
  let fixture: ComponentFixture<PreviewSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewSteps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSteps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
