import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS, SpinnerComponent, ChartModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
})
export class DashboardPage implements OnInit {
  isLoading = signal(true);
  totalLeads = signal(0);
  qualifiedLeads = signal(0);
  closedLeads = signal(0);
  avgScore = signal<number | null>(null);
  topCities = signal<{ city: string; count: number }[]>([]);
  chartByCity = signal<any>(null);
  chartByScore = signal<any>(null);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.isLoading = this.dashboardService.isLoading;
    this.totalLeads = this.dashboardService.totalLeads;
    this.qualifiedLeads = this.dashboardService.qualifiedLeads;
    this.closedLeads = this.dashboardService.closedLeads;
    this.avgScore = this.dashboardService.avgScore;
    this.topCities = this.dashboardService.topCities;
    this.chartByCity = this.dashboardService.chartByCity;
    this.chartByScore = this.dashboardService.chartByScore;

    this.dashboardService.loadData();
  }
}
