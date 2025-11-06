import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { Lead } from '../../../../core/models/lead.model';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-leads-table',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './leads-table.page.html',
  styleUrl: './leads-table.page.css',
})
export class LeadsTablePage implements OnInit {
  displayedColumns = [
    'id',
    'name',
    'dni',
    'email',
    'phone',
    'city',
    'lead_score',
    'status',
    'actions',
  ];

  leads = signal<Lead[]>([]);
  isLoading = signal(true);

  constructor(private leadsService: LeadsService) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.isLoading.set(true);
    this.leadsService.getAll().subscribe({
      next: (data) => {
        this.leads.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar leads', err);
        this.isLoading.set(false);
      },
    });
  }

  refresh() {
    this.loadLeads();
  }

  viewLead(lead: Lead) {
    console.log('Ver lead:', lead);
  }

  deleteLead(id: number) {
    this.leadsService.delete(id).subscribe({
      next: () => this.loadLeads(),
      error: (err) => console.error('Error al eliminar lead', err),
    });
  }
}
