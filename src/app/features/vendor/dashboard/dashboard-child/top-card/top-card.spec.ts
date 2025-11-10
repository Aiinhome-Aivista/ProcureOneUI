import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCard } from './top-card';

describe('TopCard', () => {
  let component: TopCard;
  let fixture: ComponentFixture<TopCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
