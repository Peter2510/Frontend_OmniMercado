import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteComponent } from './visitor.component';

describe('VisitanteComponent', () => {
  let component: VisitanteComponent;
  let fixture: ComponentFixture<VisitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitanteComponent]
    });
    fixture = TestBed.createComponent(VisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
