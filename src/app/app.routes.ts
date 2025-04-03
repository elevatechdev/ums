import { Routes } from '@angular/router';
import { UsersComponent } from './shared/core/users/users.component';
import { ChatComponent } from './shared/core/chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    {path: 'chat', component: ChatComponent},
    {path: 'user', component: UsersComponent}
];
