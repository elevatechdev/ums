import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-user-card',
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() name: string = 'User';
  @Input() email: string = '';
  @Input() photoURL: string = '';
}
