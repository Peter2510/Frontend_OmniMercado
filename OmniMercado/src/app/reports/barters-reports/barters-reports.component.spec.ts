import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartersReportsComponent } from './barters-reports.component';

describe('BartersReportsComponent', () => {
  let component: BartersReportsComponent;
  let fixture: ComponentFixture<BartersReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BartersReportsComponent]
    });
    fixture = TestBed.createComponent(BartersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
