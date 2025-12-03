import { Component, input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../../../../core/services';

@Component({
  selector: 'app-step-indicator',
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.css'],
})
export class StepIndicatorComponent implements OnInit {
  private registerService = inject(RegisterService);
  currentStep = input<number>(2);

  steps = signal([
    { number: 1, label: 'Basic information', icon: 'description', percent: 50 },
    { number: 2, label: 'Financial Verification', icon: 'monitoring',   },
    { number: 3, label: 'Risk Factor', icon: 'shield',  },
    { number: 4, label: 'Capability', icon: 'business_center',  },
    { number: 5, label: 'Approved', icon: 'verified' }
  ]);

  ngOnInit() {
    this.fetchRegistrationData();
  }

  fetchRegistrationData() {
    const vendorId = sessionStorage.getItem('vendorId');
    if (!vendorId) return;

    this.registerService.getVendorRegistrationFullData(vendorId).subscribe({
      next: (res) => {
        if (res.isSuccess && res.data?.ai_assessment) {
          const ai = res.data.ai_assessment;
          
          this.steps.update(steps => steps.map(step => {
            if (step.number === 2) return { ...step, percent: ai.financial_verification_score };
            if (step.number === 3) return { ...step, percent: ai.risk_factor_score };
            if (step.number === 4) return { ...step, percent: ai.capability_score };
            return step;
          }));
        }
      },
      error: (err) => console.error('Error fetching registration data:', err)
    });
  }

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

    const primary = 'var(--color-primary-600)';
    const track = step.number < this.currentStep() ? '#e5e7eb' : '#f3f4f6';
    const deg = pct * 3.6;
    return `conic-gradient(${primary} ${deg}deg, ${track} 0deg)`;
  }

}
