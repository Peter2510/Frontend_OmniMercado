import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVolunteeringVisitorComponent } from './info-volunteering-visitor.component';

describe('InfoVolunteeringVisitorComponent', () => {
  let component: InfoVolunteeringVisitorComponent;
  let fixture: ComponentFixture<InfoVolunteeringVisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVolunteeringVisitorComponent]
    });
    fixture = TestBed.createComponent(InfoVolunteeringVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
