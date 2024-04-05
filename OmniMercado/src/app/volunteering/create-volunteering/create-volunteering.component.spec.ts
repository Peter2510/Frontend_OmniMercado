import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVolunteeringComponent } from './create-volunteering.component';

describe('CreateVolunteeringComponent', () => {
  let component: CreateVolunteeringComponent;
  let fixture: ComponentFixture<CreateVolunteeringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVolunteeringComponent]
    });
    fixture = TestBed.createComponent(CreateVolunteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
