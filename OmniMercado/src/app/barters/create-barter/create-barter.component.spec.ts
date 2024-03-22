import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBarterComponent } from './create-barter.component';

describe('CreateBarterComponent', () => {
  let component: CreateBarterComponent;
  let fixture: ComponentFixture<CreateBarterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBarterComponent]
    });
    fixture = TestBed.createComponent(CreateBarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
