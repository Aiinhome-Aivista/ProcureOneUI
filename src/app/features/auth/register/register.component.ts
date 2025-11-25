import { Component, computed, signal, ViewChild } from '@angular/core';
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
  @ViewChild('identityDetails') private identityDetailsComponent?: IdentityDetails;
  @ViewChild('businessTaxRegistration') private businessTaxRegistrationComponent?: BusinessTaxRegistration;
  @ViewChild('bankIdentityVerification') private bankIdentityVerificationComponent?: BankIdentityVerification;

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

    // Validate the current step before proceeding
    const currentStepNumber = this.currentStep();
    let isValid = false;

    switch (currentStepNumber) {
      case 1:
        isValid = this.validateStep1();
        break;
      case 2:
        isValid = this.validateStep2();
        break;
      case 3:
        isValid = this.validateStep3();
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
      return;
    }

    // If it's the first step, open dialog instead of going next immediately
    if (currentStepNumber === 1) {
      console.log('Opening dialog for step 1');
      this.openDialog();
    } else {
      this.currentStep.update((step) => Math.min(this.totalSteps, step + 1));
    }
  }

  private validateStep1(): boolean {
    if (!this.identityDetailsComponent) {
      return false;
    }

    const identityForm = this.identityDetailsComponent.identityForm;
    const addressForm = this.identityDetailsComponent.addressForm;

    // Check if identity form is valid
    if (identityForm.invalid) {
      identityForm.markAllAsTouched();
      this.identityDetailsComponent.switchTab('identity');
      return false;
    }

    // Check if address form is valid
    if (addressForm.invalid) {
      addressForm.markAllAsTouched();
      this.identityDetailsComponent.switchTab('addresses');
      return false;
    }

    return true;
  }

  private validateStep2(): boolean {
    if (!this.businessTaxRegistrationComponent) {
      return false;
    }

    const form = this.businessTaxRegistrationComponent.form;
    if (form?.invalid) {
      form.markAllAsTouched();
      return false;
    }

    return true;
  }

  private validateStep3(): boolean {
    if (!this.bankIdentityVerificationComponent) {
      return false;
    }

    return this.bankIdentityVerificationComponent.isValid();
  }

 

  previousStep(): void {
    if (this.isFirstStep()) {
      return;
    }

    this.currentStep.update((step) => Math.max(1, step - 1));
  }

  resetSteps(): void {
    this.resetActiveStepForm();
    this.showDialog = false;
  }

  private resetActiveStepForm(): void {
    const step = this.currentStep();
    if (step === 1) {
      this.identityDetailsComponent?.resetAllForms();
      return;
    }

    if (step === 2) {
      this.businessTaxRegistrationComponent?.resetForm();
      return;
    }

    if (step === 3) {
      this.bankIdentityVerificationComponent?.resetForm();
    }
  }
}
