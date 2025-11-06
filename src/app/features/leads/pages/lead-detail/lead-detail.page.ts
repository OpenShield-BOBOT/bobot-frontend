import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { ActivatedRoute } from '@angular/router';
import { LeadsService } from '../../services/leads.service';
import { Lead } from '../../../../core/models/lead.model';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './lead-detail.page.html',
  styleUrl: './lead-detail.page.css',
})
export class LeadDetailPage implements OnInit {
  lead = signal<Lead | null>(null);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private leadsService: LeadsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadLead(id);
    }
  }

  loadLead(id: number) {
    this.isLoading.set(true);
    this.leadsService.getById(id).subscribe({
      next: (data) => {
        this.lead.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al obtener lead:', err);
        this.isLoading.set(false);
      },
    });
  }
}
