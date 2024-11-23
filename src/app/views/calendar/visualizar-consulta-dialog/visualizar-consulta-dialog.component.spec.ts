import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarConsultaDialogComponent } from './visualizar-consulta-dialog.component';

describe('VisualizarConsultaDialogComponent', () => {
  let component: VisualizarConsultaDialogComponent;
  let fixture: ComponentFixture<VisualizarConsultaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarConsultaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarConsultaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
