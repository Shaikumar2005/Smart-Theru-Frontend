import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CollectorService } from '../../services/collector.service';
import { Collector } from '../../models/collector.model';

@Component({
  selector: 'app-collectors',
  standalone: true,
  imports: [CommonModule],   // ✅ REQUIRED for *ngIf, *ngFor
  templateUrl: './collectors.component.html',
  styleUrl: './collectors.component.css'
})
export class CollectorsComponent implements OnInit, OnDestroy {

  collectors: Collector[] = [];
  private navSub!: Subscription;

  constructor(
    private collectorService: CollectorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCollectors();

    this.navSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadCollectors();
      });
  }

  loadCollectors(): void {
    this.collectorService.getAll().subscribe({
      next: (data) => {
        console.log('Collectors loaded:', data);
        this.collectors = data;
      },
      error: (err) => {
        console.error('Collector load error', err);
      }
    });
  }

  deleteCollector(id: number): void {

    if (!confirm('Are you sure you want to delete this collector?')) {
      return;
    }

    this.collectorService.delete(id).subscribe({
      next: () => {
        console.log('Collector deleted:', id);
        this.loadCollectors(); // ✅ refresh list
      },
      error: err => {
        console.error('Delete failed', err);
        alert('Delete failed');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navSub) {
      this.navSub.unsubscribe();
    }
  }
}