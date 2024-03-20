import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPendingApprovalComponent } from './products-pending-approval.component';

describe('ProductsPendingApprovalComponent', () => {
  let component: ProductsPendingApprovalComponent;
  let fixture: ComponentFixture<ProductsPendingApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsPendingApprovalComponent]
    });
    fixture = TestBed.createComponent(ProductsPendingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
