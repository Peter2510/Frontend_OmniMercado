import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVolunteeringsComponent } from './user-volunteerings.component';

describe('UserVolunteeringsComponent', () => {
  let component: UserVolunteeringsComponent;
  let fixture: ComponentFixture<UserVolunteeringsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserVolunteeringsComponent]
    });
    fixture = TestBed.createComponent(UserVolunteeringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
