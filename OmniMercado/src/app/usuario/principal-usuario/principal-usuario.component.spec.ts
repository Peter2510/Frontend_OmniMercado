import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalUsuarioComponent } from './principal-usuario.component';

describe('PrincipalUsuarioComponent', () => {
  let component: PrincipalUsuarioComponent;
  let fixture: ComponentFixture<PrincipalUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalUsuarioComponent]
    });
    fixture = TestBed.createComponent(PrincipalUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
