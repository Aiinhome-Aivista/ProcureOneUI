import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.css'],
})
export class StepIndicatorComponent {


   currentStep = input<number>(2);

  // optionally pass percent for current step ring progress
  steps = [
    { number: 1, label: 'Basic information', icon: 'description', percent: 50 },
    { number: 2, label: 'Financial Verification', icon: 'monitoring', percent: 100 },
    { number: 3, label: 'Risk Factor', icon: 'shield', percent: 40 },
    { number: 4, label: 'Capability', icon: 'business_center', percent: 72 },
    { number: 5, label: 'Approved', icon: 'verified' }
  ];

 getStepStateClass(stepNumber: number): string {
  const current = this.currentStep();
  if (stepNumber < current) return 'ring-4 ring-primary-200';
  if (stepNumber === current) return 'ring-4 ring-primary-200';
  return 'ring-4 ring-gray-200';
}

getIconClass(stepNumber: number): string {
  const current = this.currentStep();
  if (stepNumber < current) return 'text-primary-600 bg-primary-200 rounded-full font-bold text-xl';
  if (stepNumber === current) return 'text-primary-700 text-xl';
  return 'text-gray-600 text-2xl';
}

getRingBackground(step: { number: number; percent?: number }): string {
  const pct = Math.max(0, Math.min(100, step.percent ?? (step.number < this.currentStep() ? 100 : 0)));
  // completed: full primary ring, current: partial ring, upcoming: light ring with small primary head if pct>0
  const primary = 'var(--color-primary-600)';
  const track = step.number < this.currentStep() ? '#e5e7eb' : '#f3f4f6';
  const deg = pct * 3.6;
  return `conic-gradient(${primary} ${deg}deg, ${track} 0deg)`;
}

}
