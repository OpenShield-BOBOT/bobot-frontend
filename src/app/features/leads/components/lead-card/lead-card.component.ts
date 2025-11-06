import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/material/material.imports';
import {Lead} from '../../../../core/models/lead.model';

@Component({
  selector: 'app-lead-card',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './lead-card.component.html',
  styleUrl: './lead-card.component.css',
})
export class LeadCardComponent {
  @Input() lead!: Lead;
  @Output() view = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  get initials(): string {
    if (!this.lead?.name) return 'L';
    const parts = [this.lead.name, this.lead.lastName].filter(
      (p): p is string => !!p
    );
    return parts.map(p => p.charAt(0).toUpperCase()).join('');
  }

  get statusColor(): string {
    switch (this.lead.status) {
      case 'new':
        return '#007bff';
      case 'contacted':
        return '#00b894';
      case 'qualified':
        return '#f9a825';
      case 'closed':
        return '#d32f2f';
      default:
        return '#9e9e9e';
    }
  }
}
