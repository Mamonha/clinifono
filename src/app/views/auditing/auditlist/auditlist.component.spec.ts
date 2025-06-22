import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlistComponent } from './auditlist.component';

describe('AuditlistComponent', () => {
  let component: AuditlistComponent;
  let fixture: ComponentFixture<AuditlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
