import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminReport } from '../models/admin-report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {

  private api = 'http://localhost:8080/api/reports/admin';

  constructor(private http: HttpClient) {}

  getAdminReport(): Observable<AdminReport> {
    return this.http.get<AdminReport>(this.api);
  }
  getDateWiseReport(from: string, to: string) {
    return this.http.get<AdminReport>(
      `http://localhost:8080/api/reports/admin/date?from=${from}&to=${to}`
    );
  }
}