import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepIndicatorComponent } from './components/step-indicator.component';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    StepIndicatorComponent,
    Sidebar
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Component logic will be implemented here
}
