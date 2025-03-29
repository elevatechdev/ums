import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "user-management-system-e03ce", appId: "1:721725039781:web:8face8f9367bed3848d94c", storageBucket: "user-management-system-e03ce.firebasestorage.app", apiKey: "AIzaSyDjylnK73_GzW1a1JKNWTYxJwB8e1YKHbQ", authDomain: "user-management-system-e03ce.firebaseapp.com", messagingSenderId: "721725039781" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
