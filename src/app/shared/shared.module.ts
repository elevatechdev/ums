import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidePanelComponent } from './left-side-panel/left-side-panel.component';
import { RightSidePanelComponent } from './right-side-panel/right-side-panel.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
  declarations: [
    RightSidePanelComponent,
    FooterComponent,
    LeftSidePanelComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    RightSidePanelComponent,
    FooterComponent,
    LeftSidePanelComponent
  ]
})
export class SharedModule { }
