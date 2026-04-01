import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleData } from '../models/vehicle-data.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getLatest(vehicleId: string): Observable<VehicleData> {
    return this.http.get<VehicleData>(
      `${this.apiUrl}/latest/${vehicleId}`
    );
  }
}