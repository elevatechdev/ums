import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routes';
import { UsersComponent } from './users.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    RouterModule.forChild(usersRoutes),
    SharedModule,
    FormsModule,
    CommonModule,
    PagesModule
  ],
})
export class UsersModule { }
