import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductAdminComponent } from './info-product-admin.component';

describe('InfoProductAdminComponent', () => {
  let component: InfoProductAdminComponent;
  let fixture: ComponentFixture<InfoProductAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProductAdminComponent]
    });
    fixture = TestBed.createComponent(InfoProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
