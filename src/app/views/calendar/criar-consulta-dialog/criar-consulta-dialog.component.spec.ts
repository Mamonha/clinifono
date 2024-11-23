import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarConsultaDialogComponent } from './criar-consulta-dialog.component';

describe('CriarConsultaDialogComponent', () => {
  let component: CriarConsultaDialogComponent;
  let fixture: ComponentFixture<CriarConsultaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarConsultaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarConsultaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
