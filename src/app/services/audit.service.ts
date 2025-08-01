import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditReport } from '../models/audit-report';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  http = inject(HttpClient);

  API = '/clinifono-0.0.1-SNAPSHOT/api/reports';

  constructor() {}

  getAuditReport(): Observable<AuditReport[]> {
    return this.http.get<AuditReport[]>(`${this.API}/audit`);
  }
}
