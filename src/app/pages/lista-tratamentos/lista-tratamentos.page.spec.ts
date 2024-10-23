import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTratamentosPage } from './lista-tratamentos.page';

describe('ListaTratamentosPage', () => {
  let component: ListaTratamentosPage;
  let fixture: ComponentFixture<ListaTratamentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTratamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
