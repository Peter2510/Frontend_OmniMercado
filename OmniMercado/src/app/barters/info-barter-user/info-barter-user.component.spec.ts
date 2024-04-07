import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBarterUserComponent } from './info-barter-user.component';

describe('InfoBarterUserComponent', () => {
  let component: InfoBarterUserComponent;
  let fixture: ComponentFixture<InfoBarterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBarterUserComponent]
    });
    fixture = TestBed.createComponent(InfoBarterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
