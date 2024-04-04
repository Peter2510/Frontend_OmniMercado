import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductVisitorComponent } from './info-product-visitor.component';

describe('InfoProductVisitorComponent', () => {
  let component: InfoProductVisitorComponent;
  let fixture: ComponentFixture<InfoProductVisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProductVisitorComponent]
    });
    fixture = TestBed.createComponent(InfoProductVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
