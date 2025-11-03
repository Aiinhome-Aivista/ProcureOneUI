import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between w-full">
      @for (step of steps; track step.number) {
        <div class="flex items-center" [class.flex-1]="!$last">
          <!-- Step Circle -->
          <div class="flex flex-col items-center">
            <div 
              [class]="getStepClass(step.number)"
              class="w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative"
            >
              @if (step.number < currentStep()) {
                <span class="material-icons text-xl">check</span>
              } @else {
                <span class="material-icons text-2xl">{{ step.icon }}</span>
              }
            </div>
            
            <!-- Step Label -->
            <div class="mt-2 text-center">
              <p class="text-xs font-medium text-gray-900">{{ step.label }}</p>
            </div>
          </div>
          
          <!-- Connector Line -->
          @if (!$last) {
            <div 
              [class]="step.number < currentStep() ? 'bg-primary-600' : 'bg-gray-300'"
              class="flex-1 h-1 mx-2 transition-all duration-300"
            ></div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
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
