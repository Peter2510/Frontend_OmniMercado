import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVolunteeringComponent } from './info-volunteering.component';

describe('InfoVolunteeringComponent', () => {
  let component: InfoVolunteeringComponent;
  let fixture: ComponentFixture<InfoVolunteeringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVolunteeringComponent]
    });
    fixture = TestBed.createComponent(InfoVolunteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
