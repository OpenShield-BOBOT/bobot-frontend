import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../shared/material/material.imports';
import { ChatbotService } from '../../services/chatbot.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, MATERIAL_IMPORTS],
  templateUrl: './chatbot.page.html',
  styleUrl: './chatbot.page.css',
})
export class ChatbotPage {
  isOpen = signal(false);
  input = signal('');
  messages = signal<{ role: 'user' | 'bot'; text: string; typing?: boolean }[]>([]);
  loading = signal(false);

  showLeadForm = signal(false);
  leadData = signal({
    nombres: '',
    apellidos: '',
    ciudad: '',
    telefono: '',
    correo: '',
    dni: '',
  });

  constructor(private chatbotService: ChatbotService, private http: HttpClient) {}

  toggleChat() {
    this.isOpen.update((v) => !v);
  }

  sendMessage() {
    const text = this.input().trim();
    if (!text) return;

    this.messages.update((msgs) => [...msgs, { role: 'user', text }]);
    this.input.set('');
    this.loading.set(true);

    this.messages.update((msgs) => [...msgs, { role: 'bot', text: '', typing: true }]);

    this.chatbotService.sendMessage(text).subscribe({
      next: (res) => {
        this.messages.update((msgs) => msgs.filter((m) => !(m as any).typing));

        this.messages.update((msgs) => [...msgs, { role: 'bot', text: res.answer }]);
        this.loading.set(false);

        if (res.lead_score?.toLowerCase() === 'caliente') {
          this.showLeadForm.set(true);
        }
      },
      error: () => {
        this.messages.update((msgs) => msgs.filter((m) => !(m as any).typing));
        this.messages.update((msgs) => [
          ...msgs,
          { role: 'bot', text: '⚠️ Error del servidor' },
        ]);
        this.loading.set(false);
      },
    });
  }

  submitLeadForm() {
    const data = this.leadData();

    if (!data.nombres || !data.apellidos || !data.ciudad || !data.telefono || !data.correo) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.http
      .post(`${environment.apiURl}/api/v1/leads/`, {
        session_id: 'frontend-session',
        channel: 'web',
        lead_score: 'caliente',
        ...data,
      })
      .subscribe({
        next: () => {
          this.messages.update((msgs) => [
            ...msgs,
            {
              role: 'bot',
              text: '✅ Gracias. Un asesor de BOB Subastas se pondrá en contacto contigo.',
            },
          ]);
          this.showLeadForm.set(false);
        },
        error: () => alert('Error al registrar el lead.'),
      });
  }
}
