import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReportVolunteeringComponent } from './info-report-volunteering.component';

describe('InfoReportVolunteeringComponent', () => {
  let component: InfoReportVolunteeringComponent;
  let fixture: ComponentFixture<InfoReportVolunteeringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoReportVolunteeringComponent]
    });
    fixture = TestBed.createComponent(InfoReportVolunteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
