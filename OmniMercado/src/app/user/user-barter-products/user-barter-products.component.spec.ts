import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBarterProductsComponent } from './user-barter-products.component';

describe('UserBarterProductsComponent', () => {
  let component: UserBarterProductsComponent;
  let fixture: ComponentFixture<UserBarterProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBarterProductsComponent]
    });
    fixture = TestBed.createComponent(UserBarterProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
