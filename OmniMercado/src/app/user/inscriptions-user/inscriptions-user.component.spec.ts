import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionsUserComponent } from './inscriptions-user.component';

describe('InscriptionsUserComponent', () => {
  let component: InscriptionsUserComponent;
  let fixture: ComponentFixture<InscriptionsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionsUserComponent]
    });
    fixture = TestBed.createComponent(InscriptionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
