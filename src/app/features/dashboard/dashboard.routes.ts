import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import {LayoutComponent} from '../../layout/layout/layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardPage },
    ],
  },
];
