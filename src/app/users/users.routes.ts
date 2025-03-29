import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

export const usersRoutes: Routes = [
  { path: '', component: UsersComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'projects', component: ProjectsComponent },
    { path: 'dashboard', component: DashboardComponent}
  ]}
];
