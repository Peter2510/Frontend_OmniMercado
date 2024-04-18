import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteeringReportsComponent } from './volunteering-reports.component';

describe('VolunteeringReportsComponent', () => {
  let component: VolunteeringReportsComponent;
  let fixture: ComponentFixture<VolunteeringReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteeringReportsComponent]
    });
    fixture = TestBed.createComponent(VolunteeringReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
