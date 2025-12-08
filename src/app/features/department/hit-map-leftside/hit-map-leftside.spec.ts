import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitMapLeftside } from './hit-map-leftside';

describe('HitMapLeftside', () => {
  let component: HitMapLeftside;
  let fixture: ComponentFixture<HitMapLeftside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitMapLeftside]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitMapLeftside);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
