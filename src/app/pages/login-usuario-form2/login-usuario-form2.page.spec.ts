import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginUsuarioForm2Page } from './login-usuario-form2.page';

describe('LoginUsuarioForm2Page', () => {
  let component: LoginUsuarioForm2Page;
  let fixture: ComponentFixture<LoginUsuarioForm2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUsuarioForm2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
