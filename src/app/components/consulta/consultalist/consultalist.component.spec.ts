import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultalistComponent } from './consultalist.component';

describe('ConsultalistComponent', () => {
  let component: ConsultalistComponent;
  let fixture: ComponentFixture<ConsultalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultalistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
