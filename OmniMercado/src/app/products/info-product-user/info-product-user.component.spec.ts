import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductUserComponent } from './info-product-user.component';

describe('InfoProductUserComponent', () => {
  let component: InfoProductUserComponent;
  let fixture: ComponentFixture<InfoProductUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProductUserComponent]
    });
    fixture = TestBed.createComponent(InfoProductUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
