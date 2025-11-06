import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePage },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'leads',
    loadChildren: () =>
      import('./features/leads/leads.routes').then(m => m.LEADS_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
