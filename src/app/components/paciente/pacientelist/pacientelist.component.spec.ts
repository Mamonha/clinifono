import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientelistComponent } from './pacientelist.component';

describe('PacientelistComponent', () => {
  let component: PacientelistComponent;
  let fixture: ComponentFixture<PacientelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
