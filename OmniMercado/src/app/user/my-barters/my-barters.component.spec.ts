import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBartersComponent } from './my-barters.component';

describe('MyBartersComponent', () => {
  let component: MyBartersComponent;
  let fixture: ComponentFixture<MyBartersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBartersComponent]
    });
    fixture = TestBed.createComponent(MyBartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
