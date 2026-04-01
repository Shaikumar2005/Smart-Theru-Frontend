import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouteService } from '../../services/route.service';
import { RouteMapService } from '../../services/route-map.service';

import { Route } from '../../models/route.model';
import { RoutePoint } from '../../models/route-point.model';

/* ✅ IMPORTANT: tell TypeScript that google exists */
declare const google: any;

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent implements OnInit {

  /* ========= ROUTES LIST ========= */
  routes: Route[] = [];

  /* ========= MAP RELATED =========
     (use `any` to avoid namespace errors, logic unchanged)
  */
  map!: any;
  path: { lat: number; lng: number }[] = [];
  polyline?: any;

  /* ========= FORM ========= */
  routeName: string = '';

  constructor(
    private routeService: RouteService,
    private routeMapService: RouteMapService
  ) {}

  ngOnInit(): void {
    this.loadRoutes();
    this.initMap();
  }

  /* ========= LOAD ROUTES ========= */
  loadRoutes(): void {
    this.routeService.getAll()
      .subscribe(data => {
        this.routes = data;
        console.log('Routes loaded:', data);
      });
  }

  /* ========= DELETE ROUTE ========= */
  deleteRoute(id: number): void {
    this.routeService.delete(id)
      .subscribe(() => {
        this.loadRoutes();
      });
  }

  /* ========= MAP INIT ========= */
  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat: 18.5204, lng: 73.8567 },
        zoom: 14
      }
    );

    this.map.addListener('click', (e: any) => {
      if (!e.latLng) return;

      const point = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      this.path.push(point);

      new google.maps.Marker({
        position: point,
        map: this.map
      });

      if (this.polyline) {
        this.polyline.setMap(null);
      }

      this.polyline = new google.maps.Polyline({
        path: this.path,
        map: this.map,
        strokeColor: '#6d28d9',
        strokeWeight: 4
      });
    });
  }

  /* ========= SAVE ROUTE + POINTS ========= */
  saveRoute(): void {

    if (!this.routeName || this.path.length < 2) {
      alert('Enter route name and click at least 2 points on map');
      return;
    }

    // 1️⃣ Save route
    this.routeService.create({
      id: 0,
      routeName: this.routeName,
      active: true
    }).subscribe(route => {

      // 2️⃣ Convert map path to RoutePoints
      const points: RoutePoint[] = this.path.map((p, i) => ({
        latitude: p.lat,
        longitude: p.lng,
        sequenceNo: i + 1
      }));

      // 3️⃣ Save route points
      this.routeMapService.savePoints(route.id, points)
        .subscribe(() => {
          alert('Route saved successfully');

          this.resetMap();
          this.loadRoutes();
        });
    });
  }

  /* ========= RESET ========= */
  resetMap(): void {
    this.routeName = '';
    this.path = [];

    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = undefined;
    }
  }
}