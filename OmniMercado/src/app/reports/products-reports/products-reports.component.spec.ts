import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsReportsComponent } from './products-reports.component';

describe('ProductsReportsComponent', () => {
  let component: ProductsReportsComponent;
  let fixture: ComponentFixture<ProductsReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsReportsComponent]
    });
    fixture = TestBed.createComponent(ProductsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
