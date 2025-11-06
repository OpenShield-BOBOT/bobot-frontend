import { Injectable, signal } from '@angular/core';
import { LeadsService } from '../../leads/services/leads.service';
import { Lead } from '../../../core/models/lead.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  isLoading = signal(true);
  leads = signal<Lead[]>([]);
  totalLeads = signal(0);
  qualifiedLeads = signal(0);
  closedLeads = signal(0);
  avgScore = signal<number | null>(null);
  topCities = signal<{ city: string; count: number }[]>([]);
  chartByCity = signal<any>(null);
  chartByScore = signal<any>(null);

  constructor(private leadsService: LeadsService) {}

  loadData() {
    this.isLoading.set(true);
    this.leadsService.getAll().subscribe({
      next: (data) => {
        this.leads.set(data);
        this.calculateStats(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error cargando leads:', err);
        this.isLoading.set(false);
      },
    });
  }

  private calculateStats(data: Lead[]) {
    this.totalLeads.set(data.length);
    this.qualifiedLeads.set(data.filter((l) => l.status === 'qualified').length);
    this.closedLeads.set(data.filter((l) => l.status === 'closed').length);

    const scores = data.map((l) => l.lead_score_numeric || 0);
    this.avgScore.set(scores.length ? scores.reduce((a, b) => a + b) / scores.length : null);

    const cityCount: Record<string, number> = {};
    data.forEach((l) => {
      if (l.city) cityCount[l.city] = (cityCount[l.city] || 0) + 1;
    });

    const topCities = Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    this.topCities.set(topCities);
    this.prepareCharts(topCities, data);
  }

  private prepareCharts(cities: { city: string; count: number }[], data: Lead[]) {
    this.chartByCity.set({
      labels: cities.map((c) => c.city),
      datasets: [
        {
          label: 'Leads por Ciudad',
          data: cities.map((c) => c.count),
          backgroundColor: ['#0284C7', '#14B8A6', '#EAB308', '#F97316', '#8B5CF6'],
        },
      ],
    });

    const scoreCounts: Record<string, number> = {};
    data.forEach((l) => {
      const score = l.lead_score || 'Desconocido';
      scoreCounts[score] = (scoreCounts[score] || 0) + 1;
    });

    this.chartByScore.set({
      labels: Object.keys(scoreCounts),
      datasets: [
        {
          data: Object.values(scoreCounts),
          backgroundColor: ['#22C55E', '#EAB308', '#F87171', '#94A3B8'],
        },
      ],
    });
  }
}
