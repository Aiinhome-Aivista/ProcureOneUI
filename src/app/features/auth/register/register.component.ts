import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Sidebar } from './components/sidebar/sidebar';
import { IdentityDetails } from './components/steps/identity-details/identity-details';
import { BusinessTaxRegistration } from './components/steps/business-tax-registration/business-tax-registration';
import { BankIdentityVerification } from './components/steps/bank-identity-verification/bank-identity-verification';
// import { FinancialDocuments } from './components/steps/financial-documents/financial-documents';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { FinalSubmission } from './components/steps/final-submission/final-submission';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    Sidebar,
    IdentityDetails,
    BusinessTaxRegistration,
    BankIdentityVerification,
  
    StepIndicatorComponent,
    FinalSubmission,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Current step signal - connected to sidebar
  readonly currentStep = signal<number>(1);
  private readonly totalSteps = 4;
  readonly isFirstStep = computed(() => this.currentStep() === 1);
  readonly isLastStep = computed(() => this.currentStep() === this.totalSteps);

  public showDialog = false; // control dialog visibility

  companyData = {
    name: 'Airlift-Avistas-Pvt. Ltd.',
    type: 'Private Limited',
    cin: 'U12345WB2015PTC123456',
    incorporationDate: '15-Mar-2015',
    category: 'Logistics',
    addressLegal: 'Registered Address',
    addressOperational: 'Operational Address',
    headerdescription: `This is the final step in completing your company’s basic registration process. Before submitting, please carefully review all the information you have entered in the sections including Company Profile, Business Address, Legal Structure, and Contact Details.`,
    description: `We are a national-level logistics service provider specializing in bulk material 
    transport, warehousing management, and supply chain optimization for industrial clients. 
    Our fleet includes 100 heavy-duty vehicles equipped with GPS tracking, and we operate across 
    all major metro and tier-2 cities in India.`,
    contact: {
      name: 'Procurement Head',
      phone: '+91 8542658230'
    },
    footertitle: "Notable information:",
    footerdescription: "At the time of initial entry, the system automatically generates a unique Initial Registration ID (IRID) for your company. This ID allows you to pause and resume your registration at any point, ensuring that your progress is securely saved. You can use this ID to log back in, upload pending documents, or communicate with the procurement team regarding your registration status."
  };

  // Method to handle step changes from sidebar
  onStepChange(step: number): void {
    this.currentStep.set(step);
  }

  openDialog(): void {
    this.showDialog = true;
  }

  confirmAndNext(): void {
    console.log('Confirming and moving to next step');
    this.showDialog = false;

    // Manually advance to step 2
    this.currentStep.update((step) => Math.min(this.totalSteps, step + 1));
  }

  nextStep(): void {
    if (this.isLastStep()) return;
    // If it's the first step, open dialog instead of going next immediately
    if (this.currentStep() === 1) {
      console.log('Opening dialog for step 1');
      this.openDialog();
    } else {
      this.currentStep.update((step) => Math.min(this.totalSteps, step + 1));
    }
  }

  // nextStep(): void {
  //   if (this.isLastStep()) {
  //     return;
  //   }

  //   this.currentStep.update((step) => Math.min(this.totalSteps, step + 1));
  // }

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
