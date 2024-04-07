import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBarterAdminComponent } from './info-barter-admin.component';

describe('InfoBarterAdminComponent', () => {
  let component: InfoBarterAdminComponent;
  let fixture: ComponentFixture<InfoBarterAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBarterAdminComponent]
    });
    fixture = TestBed.createComponent(InfoBarterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
