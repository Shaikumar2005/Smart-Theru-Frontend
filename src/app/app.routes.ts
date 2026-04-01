import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoutesComponent } from './pages/routes/routes.component';
import { AssignRoutesComponent } from './pages/assign-routes/assign-routes.component';
import { TrackRoutesComponent } from './pages/track-routes/track-routes.component';
import { CollectorsComponent } from './pages/collectors/collectors.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'assign-routes', component: AssignRoutesComponent },
  { path: 'track-routes', component: TrackRoutesComponent },
  { path: 'collectors', component: CollectorsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', redirectTo: 'dashboard' }
];