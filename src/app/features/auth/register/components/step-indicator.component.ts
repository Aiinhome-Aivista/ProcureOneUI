import { Component } from '@angular/core';
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
              class="w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative bg-gray-200 text-gray-600"
            >
              <span class="material-symbols-outlined text-2xl">{{ step.icon }}</span>
            </div>
            
            <!-- Step Label -->
            <div class="mt-2 text-center">
              <p class="text-xs font-medium text-gray-900">{{ step.label }}</p>
            </div>
          </div>
          
          <!-- Connector Line -->
          @if (!$last) {
            <div 
              class="flex-1 h-1 mx-2 transition-all duration-300 bg-gray-300"
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
  // Static display - no dynamic step tracking
  steps = [
    { number: 1, label: 'Basic Information', icon: 'description' },
    { number: 2, label: 'Financial Verification', icon: 'verified' },
    { number: 3, label: 'Risk Factor', icon: 'shield' },
    { number: 4, label: 'Capability', icon: 'business_center' },
    { number: 5, label: 'Approved', icon: 'check_circle' }
  ];
}
