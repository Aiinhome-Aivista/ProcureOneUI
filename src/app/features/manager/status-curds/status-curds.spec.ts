import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCurds } from './status-curds';

describe('StatusCurds', () => {
  let component: StatusCurds;
  let fixture: ComponentFixture<StatusCurds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCurds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCurds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
