import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsComponent } from './user-products.component';

describe('UserPostsComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPostsComponent]
    });
    fixture = TestBed.createComponent(UserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
