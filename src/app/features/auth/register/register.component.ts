import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Sidebar } from './components/sidebar/sidebar';
import { IdentityDetails } from './components/steps/identity-details/identity-details';
import { BusinessTaxRegistration } from './components/steps/business-tax-registration/business-tax-registration';
import { BankIdentityVerification } from './components/steps/bank-identity-verification/bank-identity-verification';
import { FinancialDocuments } from './components/steps/financial-documents/financial-documents';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { FinalSubmission } from "./components/steps/final-submission/final-submission";

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    Sidebar,
    IdentityDetails,
    BusinessTaxRegistration,
    BankIdentityVerification,
    FinancialDocuments,
    StepIndicatorComponent,
    FinalSubmission
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Current step signal - connected to sidebar
  readonly currentStep = signal<number>(1);
  private readonly totalSteps = 4;
  readonly isFirstStep = computed(() => this.currentStep() === 1);
  readonly isLastStep = computed(() => this.currentStep() === this.totalSteps);

  // Method to handle step changes from sidebar
  onStepChange(step: number): void {
    this.currentStep.set(step);
  }

  nextStep(): void {
    if (this.isLastStep()) {
      return;
    }

    this.currentStep.update((step) => Math.min(this.totalSteps, step + 1));
  }

  previousStep(): void {
    if (this.isFirstStep()) {
      return;
    }

    this.currentStep.update((step) => Math.max(1, step - 1));
  }

  resetSteps(): void {
    this.currentStep.set(1);
  }
}
