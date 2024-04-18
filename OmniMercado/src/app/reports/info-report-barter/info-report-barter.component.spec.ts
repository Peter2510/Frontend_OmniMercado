import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReportBarterComponent } from './info-report-barter.component';

describe('InfoReportBarterComponent', () => {
  let component: InfoReportBarterComponent;
  let fixture: ComponentFixture<InfoReportBarterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoReportBarterComponent]
    });
    fixture = TestBed.createComponent(InfoReportBarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
