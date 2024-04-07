import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteeringsPendingApprovalComponent } from './volunteerings-pending-approval.component';

describe('VolunteeringsPendingApprovalComponent', () => {
  let component: VolunteeringsPendingApprovalComponent;
  let fixture: ComponentFixture<VolunteeringsPendingApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteeringsPendingApprovalComponent]
    });
    fixture = TestBed.createComponent(VolunteeringsPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
