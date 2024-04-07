import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVolunteeringAdminComponent } from './info-volunteering-admin.component';

describe('InfoVolunteeringAdminComponent', () => {
  let component: InfoVolunteeringAdminComponent;
  let fixture: ComponentFixture<InfoVolunteeringAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVolunteeringAdminComponent]
    });
    fixture = TestBed.createComponent(InfoVolunteeringAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
