import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarterComponent } from './barters.component';

describe('BarterComponent', () => {
  let component: BarterComponent;
  let fixture: ComponentFixture<BarterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarterComponent]
    });
    fixture = TestBed.createComponent(BarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
