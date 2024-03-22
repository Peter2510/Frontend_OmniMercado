import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarterProductsPendingApprovalComponent } from './barter-products-pending-approval.component';

describe('BarterProductsPendingApprovalComponent', () => {
  let component: BarterProductsPendingApprovalComponent;
  let fixture: ComponentFixture<BarterProductsPendingApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarterProductsPendingApprovalComponent]
    });
    fixture = TestBed.createComponent(BarterProductsPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
