import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVolunteeringUserComponent } from './info-volunteering-user.component';

describe('InfoVolunteeringUserComponent', () => {
  let component: InfoVolunteeringUserComponent;
  let fixture: ComponentFixture<InfoVolunteeringUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVolunteeringUserComponent]
    });
    fixture = TestBed.createComponent(InfoVolunteeringUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
