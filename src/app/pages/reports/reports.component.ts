import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AdminReport } from '../../models/admin-report.model';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Chart from 'chart.js/auto';




@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})


export class ReportsComponent implements OnInit {

  report!: AdminReport;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReport();
  }
  fromDate!: string;
  toDate!: string;

  loadDateReport(): void {
    this.reportService
      .getDateWiseReport(this.fromDate, this.toDate)
      .subscribe(data => {
        this.report = data;
      });
  }

  loadReport(): void {
    this.reportService.getAdminReport().subscribe(data => {
      this.report = data;
    });
  }
  exportPDF(): void {
    const element = document.querySelector('.page') as HTMLElement;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('SmartTheru-Admin-Report.pdf');
    });
  }


  renderCharts(): void {

    // Bar Chart
    new Chart('routeChart', {
      type: 'bar',
      data: {
        labels: ['Route A', 'Route B', 'Route C'],
        datasets: [{
          label: 'Assignments',
          data: [5, 3, 8],
          backgroundColor: '#7c3aed'
        }]
      }
    });

    // Pie Chart
    new Chart('assignmentChart', {
      type: 'pie',
      data: {
        labels: ['Active', 'Completed'],
        datasets: [{
          data: [
            this.report.activeAssignments,
            this.report.completedAssignments
          ],
          backgroundColor: ['#22c55e', '#ef4444']
        }]
      }
    });
  }
  
}