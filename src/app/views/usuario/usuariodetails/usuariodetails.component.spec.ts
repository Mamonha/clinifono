import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariodetailsComponent } from './usuariodetails.component';

describe('UsuariodetailsComponent', () => {
  let component: UsuariodetailsComponent;
  let fixture: ComponentFixture<UsuariodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariodetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
