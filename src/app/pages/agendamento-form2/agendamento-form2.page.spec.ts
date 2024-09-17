import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentoForm2Page } from './agendamento-form2.page';

describe('AgendamentoForm2Page', () => {
  let component: AgendamentoForm2Page;
  let fixture: ComponentFixture<AgendamentoForm2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoForm2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
