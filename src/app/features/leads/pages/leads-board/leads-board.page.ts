import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LeadsService } from '../../services/leads.service';
import { Lead } from '../../../../core/models/lead.model';
import {LeadCardComponent} from '../../components/lead-card/lead-card.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-leads-board',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS, DragDropModule, LeadCardComponent],
  templateUrl: './leads-board.page.html',
  styleUrl: './leads-board.page.css',
})
export class LeadsBoardPage implements OnInit {
  isLoading = signal(true);
  readonly leadStatuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'closed'];
  groupedLeads = signal<Record<string, Lead[]>>({
    new: [],
    contacted: [],
    qualified: [],
    closed: [],
  });

  constructor(private leadsService: LeadsService, private router: Router) {}

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.isLoading.set(true);
    this.leadsService.getAll().subscribe({
      next: (data) => {
        const grouped = {
          new: data.filter((l) => l.status === 'new'),
          contacted: data.filter((l) => l.status === 'contacted'),
          qualified: data.filter((l) => l.status === 'qualified'),
          closed: data.filter((l) => l.status === 'closed'),
        };
        this.groupedLeads.set(grouped);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar leads:', err);
        this.isLoading.set(false);
      },
    });
  }

  drop(event: CdkDragDrop<Lead[]>, newStatus: Lead['status']) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      item.status = newStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.leadsService.updateStatus(item.id!, newStatus).subscribe();
    }
  }

  viewLead(id: number) {
    console.log('Ver lead', id);
  }

  editLead(id: number) {
    alert(`Editar lead con ID ${id}`);
  }

  deleteLead(id: number) {
    if (confirm('¿Deseas eliminar este lead?')) {
      this.leadsService.delete(id).subscribe(() => this.loadLeads());
    }
  }

}
