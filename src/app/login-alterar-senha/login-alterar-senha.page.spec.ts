import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAlterarSenhaPage } from './login-alterar-senha.page';

describe('LoginAlterarSenhaPage', () => {
  let component: LoginAlterarSenhaPage;
  let fixture: ComponentFixture<LoginAlterarSenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAlterarSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
