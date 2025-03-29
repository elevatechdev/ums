import { Component} from '@angular/core';
import { LeftSidePanelComponent } from "../shared/left-side-panel/left-side-panel.component";
import { RouterOutlet } from '@angular/router';
import { RightSidePanelComponent } from '../shared/right-side-panel/right-side-panel.component';
import { FooterComponent } from '../shared/footer/footer.component';


@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent{
}
