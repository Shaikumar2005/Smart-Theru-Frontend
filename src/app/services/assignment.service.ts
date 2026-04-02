import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';

@Injectable({ providedIn: 'root' })
export class AssignmentService {

  private api = 'http://localhost:8080/api/assignments';

  constructor(private http: HttpClient) {}

  // ✅ CORRECT METHOD NAME
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.api);
  }

  assign(routeId: number, collectorId: number): Observable<Assignment> {
    return this.http.post<Assignment>(
      `${this.api}?routeId=${routeId}&collectorId=${collectorId}`,
      {}
    );
  }

  deAssign(assignmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${assignmentId}`);
  }
}