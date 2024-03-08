import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariadosComponent } from './volunteering.component';

describe('VoluntariadosComponent', () => {
  let component: VoluntariadosComponent;
  let fixture: ComponentFixture<VoluntariadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoluntariadosComponent]
    });
    fixture = TestBed.createComponent(VoluntariadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
