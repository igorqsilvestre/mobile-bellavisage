import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginUsuarioForm1Page } from './login-usuario-form1.page';

describe('LoginUsuarioForm1Page', () => {
  let component: LoginUsuarioForm1Page;
  let fixture: ComponentFixture<LoginUsuarioForm1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUsuarioForm1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
