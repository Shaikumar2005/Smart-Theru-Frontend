import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectorService } from '../../services/collector.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  showAddCollector: boolean = false;

  collectorName: string = '';
  vehicleId: string = '';

  constructor(private collectorService: CollectorService) {}

  toggleAddCollector(): void {
    this.showAddCollector = !this.showAddCollector;
  }

  saveCollector(): void {
    if (!this.collectorName.trim() || !this.vehicleId.trim()) {
      alert('Please fill all fields');
      return;
    }

    this.collectorService.create({
      name: this.collectorName.trim(),
      vehicleId: this.vehicleId.trim()
    }).subscribe({
      next: () => {
        alert('Collector added successfully ✅');

        // Reset form
        this.collectorName = '';
        this.vehicleId = '';
        this.showAddCollector = false;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add collector');
      }
    });
  }
}