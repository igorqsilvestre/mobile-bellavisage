import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentoForm1Page } from './agendamento-form1.page';

describe('AgendamentoForm1Page', () => {
  let component: AgendamentoForm1Page;
  let fixture: ComponentFixture<AgendamentoForm1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoForm1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
