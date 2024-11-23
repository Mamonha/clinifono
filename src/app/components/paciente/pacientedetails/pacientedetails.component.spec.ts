import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientedetailsComponent } from './pacientedetails.component';

describe('PacientedetailsComponent', () => {
  let component: PacientedetailsComponent;
  let fixture: ComponentFixture<PacientedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientedetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
