import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItEquipment } from './it-equipment';

describe('ItEquipment', () => {
  let component: ItEquipment;
  let fixture: ComponentFixture<ItEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
