import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusninessRegistrationDocuments } from './busniness-registration-documents';

describe('BusninessRegistrationDocuments', () => {
  let component: BusninessRegistrationDocuments;
  let fixture: ComponentFixture<BusninessRegistrationDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusninessRegistrationDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusninessRegistrationDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
