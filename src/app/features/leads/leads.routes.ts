import { Routes } from '@angular/router';
import { LeadsBoardPage } from './pages/leads-board/leads-board.page';
import { LeadDetailPage } from './pages/lead-detail/lead-detail.page';
import {LayoutComponent} from '../../layout/layout/layout.component';
import {LeadsTablePage} from './pages/leads-table/leads-table.page';

export const LEADS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LeadsTablePage },
      { path: 'board', component: LeadsBoardPage },
      { path: ':id', component: LeadDetailPage },
    ],
  },
];
