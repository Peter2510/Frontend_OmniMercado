import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGendersComponent } from './info-genders.component';

describe('InfoGendersComponent', () => {
  let component: InfoGendersComponent;
  let fixture: ComponentFixture<InfoGendersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoGendersComponent]
    });
    fixture = TestBed.createComponent(InfoGendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
