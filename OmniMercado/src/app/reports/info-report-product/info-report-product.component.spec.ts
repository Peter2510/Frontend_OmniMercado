import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReportProductComponent } from './info-report-product.component';

describe('InfoReportProductComponent', () => {
  let component: InfoReportProductComponent;
  let fixture: ComponentFixture<InfoReportProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoReportProductComponent]
    });
    fixture = TestBed.createComponent(InfoReportProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
