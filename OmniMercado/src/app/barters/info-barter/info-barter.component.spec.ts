import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBarterComponent } from './info-barter.component';

describe('InfoBarterComponent', () => {
  let component: InfoBarterComponent;
  let fixture: ComponentFixture<InfoBarterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBarterComponent]
    });
    fixture = TestBed.createComponent(InfoBarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
