import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBarterVisitorComponent } from './info-barter-visitor.component';

describe('InfoBarterVisitorComponent', () => {
  let component: InfoBarterVisitorComponent;
  let fixture: ComponentFixture<InfoBarterVisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBarterVisitorComponent]
    });
    fixture = TestBed.createComponent(InfoBarterVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
