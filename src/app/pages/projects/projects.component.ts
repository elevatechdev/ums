import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  showModal = false;
  projects$: Observable<any[]> = new Observable();
  projects: any[] = [];
  searchQuery: string = '';

  // New Project Form
  newProject = { name: '', description: '', status: 'Pending' };
  isEditMode: boolean = false;
  selectedProject: any = null;
  selectedProjectId: string | null = null;

  private projectSubscription: Subscription | null = null;

  constructor(private firestore: Firestore, private projectService: ProjectsService) {}

  ngOnInit() {
    this.fetchProjects();
  }

  ngOnDestroy() {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }

  // Fetch Projects from Firestore
  fetchProjects() {
    const projectsRef = collection(this.firestore, 'projects');
    this.projects$ = collectionData(projectsRef, { idField: 'id' });

    this.projectSubscription = this.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  // Open Modal for Adding Project
  openAddProjectModal() {
    this.isEditMode = false;
    this.selectedProjectId = null;
    this.newProject = { name: '', description: '', status: 'Pending' };
    this.showModal = true;
  }

  // Open Modal for Editing Project
  openEditProjectModal(project: any) {
    this.isEditMode = true;
    this.selectedProjectId = project.id;
    this.newProject = { ...project };
    this.showModal = true;
  }

  // Close Modal & Reset Form
  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.selectedProjectId = null;
    this.newProject = { name: '', description: '', status: 'Pending' };
  }

  // Add New Project
  saveProject() {
    this.projectService.addProject(this.newProject).then(() => {
      window.alert("Project added successfully! 🎉");
      this.closeModal();
    }).catch(error => {
      console.error("Error adding project:", error);
      window.alert("Failed to add project. ❌");
    });
  }

  // Edit Existing Project
  editProject() {
    if (this.selectedProjectId) {
      this.projectService.updateProject(this.selectedProjectId, this.newProject).then(() => {
        window.alert("Project updated successfully! ✅");
        this.closeModal();
      }).catch(error => {
        console.error("Error updating project:", error);
        window.alert("Failed to update project. ❌");
      });
    }
  }
  async deleteProject(id: string) {
    const isConfirmed = window.confirm("Are you sure you want to delete this project? This action cannot be undone.");

    if (isConfirmed) {
      try {
        await this.projectService.deleteProject(id); // Ensure correct service call
        window.alert("✅ Project deleted successfully!");

        // Remove deleted project from the UI
        this.projects = this.projects.filter(project => project.id !== id);

        // Manually trigger change detection to update UI
        setTimeout(() => {
          this.projects = [...this.projects]; // Create a new reference to trigger change detection
        }, 100);
      } catch (error) {
        console.error("❌ Error deleting project:", error);
        window.alert("Failed to delete project. Please try again.");
      }
    }
  }





  // Filtered Projects List
  filteredProjects() {
    return this.projects.filter(project =>
      project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Track By ID for better performance
  trackById(index: number, project: any) {
    return project.id;
  }
}
