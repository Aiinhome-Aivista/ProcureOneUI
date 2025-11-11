import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionHeader } from './requisition-header';

describe('RequisitionHeader', () => {
  let component: RequisitionHeader;
  let fixture: ComponentFixture<RequisitionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitionHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
