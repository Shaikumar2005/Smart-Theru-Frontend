import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({ providedIn: 'root' })
export class RouteService {

  private api = 'http://localhost:8080/api/routes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Route[]> {
    return this.http.get<Route[]>(this.api);
  }

  create(route: Route): Observable<Route> {
    return this.http.post<Route>(this.api, route);
  }

  update(id: number, route: Route): Observable<Route> {
    return this.http.put<Route>(`${this.api}/${id}`, route);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}