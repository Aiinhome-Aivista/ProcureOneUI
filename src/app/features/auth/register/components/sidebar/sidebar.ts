import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  currentStep = input<number>(1);

  readonly steps = [
    { number: 1, label: 'Basic Information', icon: 'description' },
    { number: 2, label: 'Financial Verification', icon: 'verified' },
    { number: 3, label: 'Risk Factor', icon: 'shield' },
    { number: 4, label: 'Capability', icon: 'business_center' },
    { number: 5, label: 'Approved', icon: 'check_circle' },
  ];

  getStepClass(stepNumber: number): string {
    const current = this.currentStep();
    if (stepNumber < current) {
      return 'completed';
    } else if (stepNumber === current) {
      return 'active';
    } else {
      return 'pending';
    }
  }

  isStepCompleted(stepNumber: number): boolean {
    return stepNumber < this.currentStep();
  }
  selectorTop = '120px';    // initial position
selectorHeight = '70px'; // height of purple bar

select(index: number) {
  const start = 120;   // starting top offset
  const gap = 75;      // gap between items (tweak if needed)

  this.selectorTop = (start + index * gap) + 'px';
}
}
