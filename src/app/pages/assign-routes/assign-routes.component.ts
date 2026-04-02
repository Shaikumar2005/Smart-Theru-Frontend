import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignmentService } from '../../services/assignment.service';
import { RouteService } from '../../services/route.service';
import { CollectorService } from '../../services/collector.service';

import { Assignment } from '../../models/assignment.model';
import { Route } from '../../models/route.model';
import { Collector } from '../../models/collector.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-routes.component.html',
  styleUrl: './assign-routes.component.css'
})
export class AssignRoutesComponent implements OnInit {

  routes: Route[] = [];
  collectors: Collector[] = [];
  assignments: Assignment[] = [];   // ✅ THIS MUST EXIST

  selectedRoute!: number;
  selectedCollector!: number;

  constructor(
    private assignmentService: AssignmentService,
    private routeService: RouteService,
    private collectorService: CollectorService
  ) {}

  ngOnInit(): void {
    this.loadAllData();   // ✅ MUST BE CALLED
  }

  loadAllData(): void {
    this.routeService.getAll().subscribe(r => this.routes = r);
    this.collectorService.getAll().subscribe(c => this.collectors = c);

    // ✅ THIS WAS MISSING / WRONG
    this.assignmentService.getAllAssignments().subscribe(a => {
      console.log('Already assigned routes:', a); // ✅ DEBUG
      this.assignments = a;
    });
  }

  assign(): void {
    if (!this.selectedRoute || !this.selectedCollector) {
      alert('Select both route and collector');
      return;
    }

    this.assignmentService.assign(this.selectedRoute, this.selectedCollector)
      .subscribe(() => {
        alert('Route assigned');
        this.loadAllData(); // ✅ REFRESH LIST
      });
  }

  // ✅ DE‑ASSIGN
  deAssign(assignmentId: number): void {
    this.assignmentService.deAssign(assignmentId).subscribe(() => {
      alert('Route de‑assigned');
      this.loadAllData();
    });
  }
}