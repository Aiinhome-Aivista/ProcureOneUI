import { Component, input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../../../../core/services';
import { ActivatedRoute } from '@angular/router';

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
    { number: 1, label: 'Basic information', icon: 'description', percent: 0 },
    { number: 2, label: 'Financial Verification', icon: 'monitoring', },
    { number: 3, label: 'Risk Factor', icon: 'shield', },
    { number: 4, label: 'Capability', icon: 'business_center', },
    { number: 5, label: 'Approved', icon: 'verified', }
  ]);
  private readonly route = inject(ActivatedRoute);
  private vendorId: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vendorId = params['vendorId'];
      console.log('Vendor ID from params:', this.vendorId);
      this.fetchVendorProgress(this.vendorId);
    });
  }



  fetchVendorProgress(vendor_id?: string): void {
    const vendorId = sessionStorage.getItem('vendorId') || vendor_id || this.vendorId;
    if (!vendorId) return;

    this.registerService.getVendorProgress(vendorId).subscribe({
      next: (res) => {
        console.log(res);
        this.steps.update(steps => steps.map(step => {
          if (step.number === 1) return { ...step, percent: res.basic_info_progress };
          if (step.number === 2) return { ...step, percent: res.financial_verification_progress };
          if (step.number === 3) return { ...step, percent: res.risk_factor_progress };
          if (step.number === 4) return { ...step, percent: res.capability_progress };
          return step;
        }));
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
