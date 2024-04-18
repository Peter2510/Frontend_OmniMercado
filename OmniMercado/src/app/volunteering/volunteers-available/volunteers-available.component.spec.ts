import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersAvailableComponent } from './volunteers-available.component';

describe('VolunteersAvailableComponent', () => {
  let component: VolunteersAvailableComponent;
  let fixture: ComponentFixture<VolunteersAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteersAvailableComponent]
    });
    fixture = TestBed.createComponent(VolunteersAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
