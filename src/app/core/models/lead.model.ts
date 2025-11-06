export interface Lead {
  id?: number;
  session_id?: string;
  channel?: 'web' | 'whatsapp' | 'facebook' | 'email';
  name?: string;
  lastName?: string;
  dni?: string;
  phone?: string;
  email?: string;
  city?: string;
  contact?: string;
  lead_score?: string;
  lead_score_numeric?: number;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at?: string;
  fullName?: string;
  statusColor?: string;
}
