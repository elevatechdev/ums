import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

    // Static data for project analytics
    projectAnalytics = {
      totalProjects: 100,
      activeProjects: 45,
      completedProjects: 40,
      pendingProjects: 15,
    };
    
  ngOnInit(): void {
  }

}
