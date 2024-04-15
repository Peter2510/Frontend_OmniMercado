import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCoinsComponent } from './recharge-coins.component';

describe('RechargeCoinsComponent', () => {
  let component: RechargeCoinsComponent;
  let fixture: ComponentFixture<RechargeCoinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeCoinsComponent]
    });
    fixture = TestBed.createComponent(RechargeCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
