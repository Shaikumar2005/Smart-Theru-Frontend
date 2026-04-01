import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.service';
import { CollectorService } from '../../services/collector.service';
import { AssignmentService } from '../../services/assignment.service';
import { Route } from '../../models/route.model';
import { Collector } from '../../models/collector.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ IMPORTANT
  templateUrl: './assign-routes.component.html',
  styleUrl: './assign-routes.component.css'
})
export class AssignRoutesComponent implements OnInit {

  routes: Route[] = [];
  collectors: Collector[] = [];

  selectedRoute: number | null = null;
  selectedCollector: number | null = null;

  constructor(
    private routeService: RouteService,
    private collectorService: CollectorService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.routeService.getAll().subscribe(data => {
      this.routes = data;
      console.log('Routes:', data);
    });

    this.collectorService.getAll().subscribe(data => {
      this.collectors = data;
      console.log('Collectors:', data);
    });
  }

  assign(): void {
    if (this.selectedRoute && this.selectedCollector) {
      this.assignmentService
        .assign(this.selectedRoute, this.selectedCollector)
        .subscribe(() => {
          alert('Route assigned successfully');
        });
    } else {
      alert('Please select both route and collector');
    }
  }
}