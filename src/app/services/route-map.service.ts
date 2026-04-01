import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutePoint } from '../models/route-point.model';

@Injectable({
  providedIn: 'root'
})
export class RouteMapService {

  private api = 'http://localhost:8080/api/route-map';

  constructor(private http: HttpClient) {}

  savePoints(routeId: number, points: RoutePoint[]) {
    return this.http.post(
      `${this.api}/${routeId}/points`,
      points
    );
  }

  getPoints(routeId: number) {
    return this.http.get<RoutePoint[]>(
      `${this.api}/${routeId}/points`
    );
  }
}