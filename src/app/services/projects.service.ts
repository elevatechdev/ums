import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsCollection;

  constructor(private firestore: Firestore,) {
    this.projectsCollection = collection(this.firestore, 'projects');
   }
     // Fetch all projects from Firestore
     getProjects(): Observable<any[]> {
      return collectionData(this.projectsCollection, { idField: 'id' });
    }

    // Add a new project to Firestore
    async addProject(project: any): Promise<void> {
      try {
        await addDoc(this.projectsCollection, project);
      } catch (error) {
        console.error('Error adding project:', error);
        throw error;
      }
    }

    // Update a project in Firestore
    async updateProject(projectId: string, updatedProject: any): Promise<void> {
      try {
        const projectDoc = doc(this.firestore, `projects/${projectId}`);
        await updateDoc(projectDoc, updatedProject);
      } catch (error) {
        console.error('Error updating project:', error);
        throw error;
      }
    }

    async deleteProject(projectId: string): Promise<void> {
      try {
        const projectDocRef = doc(this.firestore, 'projects', projectId); // Correct reference to the project document
        await deleteDoc(projectDocRef); // Delete document from Firestore
      } catch (error) {
        console.error('Error deleting project:', error);
        throw error; // Re-throw error for handling in the component
      }
    }

}
