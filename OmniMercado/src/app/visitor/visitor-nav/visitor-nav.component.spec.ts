import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorNavComponent } from './visitor-nav.component';

describe('VisitorNavComponent', () => {
  let component: VisitorNavComponent;
  let fixture: ComponentFixture<VisitorNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorNavComponent]
    });
    fixture = TestBed.createComponent(VisitorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
