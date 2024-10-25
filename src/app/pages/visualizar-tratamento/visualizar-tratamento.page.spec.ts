import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarTratamentoPage } from './visualizar-tratamento.page';

describe('VisualizarTratamentoPage', () => {
  let component: VisualizarTratamentoPage;
  let fixture: ComponentFixture<VisualizarTratamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarTratamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
