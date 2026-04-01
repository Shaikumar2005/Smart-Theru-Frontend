import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Collector {
  id?: number;
  name: string;
  vehicleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  private api = 'http://localhost:8080/api/collectors';

  constructor(private http: HttpClient) {}

  create(collector: Collector): Observable<Collector> {
    return this.http.post<Collector>(this.api, collector);
  }

  getAll(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.api);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}