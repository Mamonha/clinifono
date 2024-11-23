import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultadetailsComponent } from './consultadetails.component';

describe('ConsultadetailsComponent', () => {
  let component: ConsultadetailsComponent;
  let fixture: ComponentFixture<ConsultadetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultadetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
