import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityDetails } from './identity-details';

describe('IdentityDetails', () => {
  let component: IdentityDetails;
  let fixture: ComponentFixture<IdentityDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentityDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
