import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private readonly apiUrl = `${environment.apiURl}/chat`;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<{ answer: string; lead_score?: string }> {
    return this.http.post<{ answer: string; lead_score?: string }>(this.apiUrl, {
      session_id: 'frontend-session',
      message,
    });
  }
}
