import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsultaDialogComponent } from './editar-consulta-dialog.component';

describe('EditarConsultaDialogComponent', () => {
  let component: EditarConsultaDialogComponent;
  let fixture: ComponentFixture<EditarConsultaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarConsultaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarConsultaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
