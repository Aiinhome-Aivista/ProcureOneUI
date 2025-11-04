import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.css'],
})
export class StepIndicatorComponent {
  currentStep = input<number>(1);
  
  steps = [
    { number: 1, label: 'Basic Information', icon: 'description' },
    { number: 2, label: 'Financial Verification', icon: 'verified' },
    { number: 3, label: 'Risk Factor', icon: 'shield' },
    { number: 4, label: 'Capability', icon: 'business_center' },
    { number: 5, label: 'Approved', icon: 'check_circle' }
  ];

  getStepClass(stepNumber: number): string {
    const current = this.currentStep();
    if (stepNumber < current) {
      return 'bg-primary-600 text-white';
    } else if (stepNumber === current) {
      return 'bg-primary-600 text-white ring-4 ring-primary-200';
    } else {
      return 'bg-gray-200 text-gray-600';
    }
  }
}
