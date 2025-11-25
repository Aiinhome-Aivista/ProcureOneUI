import { Component, computed, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';

import { Sidebar } from './components/sidebar/sidebar';
import { IdentityDetails } from './components/steps/identity-details/identity-details';
import { BusinessTaxRegistration } from './components/steps/business-tax-registration/business-tax-registration';
import { BankIdentityVerification } from './components/steps/bank-identity-verification/bank-identity-verification';
// import { FinancialDocuments } from './components/steps/financial-documents/financial-documents';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { FinalSubmission } from './components/steps/final-submission/final-submission';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RegisterService } from '../../../core/services';

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
  private readonly registerService = inject(RegisterService);
  
  private readonly identityDetailsComponent = viewChild<IdentityDetails>('identityDetails');
  private readonly businessTaxRegistrationComponent = viewChild<BusinessTaxRegistration>('businessTaxRegistration');
  private readonly bankIdentityVerificationComponent = viewChild<BankIdentityVerification>('bankIdentityVerification');

  // Current step signal - connected to sidebar
  readonly currentStep = signal<number>(1);
  readonly isLoading = signal<boolean>(false);
  private vendorId: string | null = null;
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
    headerdescription: `This is the final step in completing your company's basic registration process. Before submitting, please carefully review all the information you have entered in the sections including Company Profile, Business Address, Legal Structure, and Contact Details.`,
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
    this.submitStep1Data();
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
    const component = this.identityDetailsComponent();
    if (!component) {
      return false;
    }

    const identityForm = component.identityForm;
    const addressForm = component.addressForm;

    // Check if identity form is valid
    if (identityForm.invalid) {
      identityForm.markAllAsTouched();
      component.switchTab('identity');
      return false;
    }

    // Check if address form is valid
    if (addressForm.invalid) {
      addressForm.markAllAsTouched();
      component.switchTab('addresses');
      return false;
    }

    return true;
  }

  private validateStep2(): boolean {
    const component = this.businessTaxRegistrationComponent();
    if (!component) {
      return false;
    }

    const form = component.form;
    if (form?.invalid) {
      form.markAllAsTouched();
      return false;
    }

    return true;
  }

  private validateStep3(): boolean {
    const component = this.bankIdentityVerificationComponent();
    if (!component) {
      return false;
    }

    return component.isValid();
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
      this.identityDetailsComponent()?.resetAllForms();
      return;
    }

    if (step === 2) {
      this.businessTaxRegistrationComponent()?.resetForm();
      return;
    }

    if (step === 3) {
      this.bankIdentityVerificationComponent()?.resetForm();
    }
  }

  private submitStep1Data(): void {
    const component = this.identityDetailsComponent();
    if (!component) {
      return;
    }

    this.isLoading.set(true);

    const identityData = component.identityForm.value;
    const addressData = component.addressForm.value;

    // Map form data to API payload structure
    const payload = {
      company_name: identityData.companyName,
      registration_number: identityData.registrationNumber,
      business_type: identityData.businessType,
      date_of_incorporation: identityData.dateOfIncorporation,
      industry_category: identityData.industryCategory,
      nature_of_business: identityData.natureOfBusiness,
      registered_address: addressData.registeredAddress,
      operational_address: addressData.operationalAddress,
      country: addressData.country,
      state: addressData.state,
      city: addressData.city,
      pin: addressData.pin,
      contact_person: addressData.contactPerson,
      designation_role: addressData.designation,
      email_official: addressData.email,
      phone_number_official: addressData.phone,
      alternate_contact: addressData.alternateContact || '',
    };

    this.registerService.postBasicInfo(payload).subscribe({
      next: (response) => {
        if (response.isSuccess === 'True' || response.status === 'success') {
          this.vendorId = response.vendor_id;
          console.log('Step 1 submitted successfully. Vendor ID:', this.vendorId);
          
          this.showDialog = false;
          this.currentStep.update((step) => Math.min(this.totalSteps, step + 1));
        } else {
          this.handleError(response.message || 'Failed to submit basic information');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        this.handleError(error?.error?.message || 'An error occurred while submitting basic information');
        this.isLoading.set(false);
      },
    });
  }

  private handleError(message: string): void {
    console.error('API Error:', message);
    // TODO: Show toast/notification to user
    // alert(message);
  }
}
