export interface Interaction {
  id?: number;
  session_id: string;
  user_message: string;
  bot_response: string;
  lead_score?: string;
  lead_score_numeric?: number;
  response_time_ms?: number;
  used_context?: boolean;
  created_at?: string;
}
