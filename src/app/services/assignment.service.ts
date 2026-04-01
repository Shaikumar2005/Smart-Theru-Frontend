import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssignmentService {

  private api = 'http://localhost:8080/api/assignments';

  constructor(private http: HttpClient) {}

  assign(routeId: number, collectorId: number): Observable<Assignment> {
    return this.http.post<Assignment>(
      `${this.api}?routeId=${routeId}&collectorId=${collectorId}`,
      {}
    );
  }

  getByCollector(collectorId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.api}/collector/${collectorId}`);
  }
}