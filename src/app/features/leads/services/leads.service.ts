import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Lead } from '../../../core/models/lead.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiURl}/leads`;

  getAll(): Observable<Lead[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`).pipe(
      map(data =>
        data.map(l => ({
          id: l.id,
          session_id: l.session_id,
          channel: l.channel,
          name: l.nombres,
          lastName: l.apellidos,
          dni: l.dni,
          phone: l.telefono,
          email: l.correo_electronico,
          city: l.ciudad,
          lead_score: l.lead_score,
          lead_score_numeric: l.lead_score_numeric,
          status: l.status,
          created_at: l.created_at
        }))
      )
    );
  }


  getById(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`);
  }

  create(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.apiUrl, lead);
  }

  update(id: number, lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${id}`, lead);
  }

  updateStatus(id: number, status: string) {
    return this.http.patch<Lead>(`${this.apiUrl}/${id}`, { status });
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
