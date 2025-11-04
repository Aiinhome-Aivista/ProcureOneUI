import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Sidebar } from './components/sidebar/sidebar';
import { IdentityDetails } from './components/steps/identity-details/identity-details';
import { BusinessTaxRegistration } from './components/steps/business-tax-registration/business-tax-registration';
import { BankIdentityVerification } from './components/steps/bank-identity-verification/bank-identity-verification';
import { FinancialDocuments } from './components/steps/financial-documents/financial-documents';
import { StepIndicatorComponent } from "./components/step-indicator/step-indicator.component";

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
    StepIndicatorComponent
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Current step signal - connected to sidebar
  readonly currentStep = signal<number>(1);

  // Method to handle step changes from sidebar
  onStepChange(step: number): void {
    this.currentStep.set(step);
  }
}
