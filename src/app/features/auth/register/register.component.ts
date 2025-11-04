import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepIndicatorComponent } from './components/step-indicator.component';
import { CompanyDetailsComponent } from './steps/step1-basic-info/step1-basic-info.component';
import { Step2FinancialVerificationComponent } from './steps/step2-financial-verification/step2-financial-verification.component';
import { Step3RiskFactorComponent } from './steps/step3-risk-factor/step3-risk-factor.component';
import { Step4CapabilityComponent } from './steps/step4-capability/step4-capability.component';
import { Step5ApprovedComponent } from './steps/step5-approved/step5-approved.component';
import { Sidebar } from './components/sidebar/sidebar';

export interface RegistrationData {
  // Step 1: Basic Information
  basicInfo: {
    companyName: string;
    businessType: string;
    registrationNumber: string;
    dateOfIncorporation: string;
    industryCategory: string;
    natureOfBusiness: string;
  };

  // Step 1b: Addresses (added)
  addresses: {
    registeredAddress: string;
    operationalAddress: string;
    country: string;
    state: string;
    city: string;
    pin: string;
    contactPerson: string;
    designation: string;
    email: string;
    phone: string;
    alternateContact?: string;
  };

  // Step 2: Financial Verification
  financialVerification: {
    panCard: File | null;
    udyamMsme: File | null;
    businessLicense: File | null;
    supportDocument: File | null;
  };

  // Step 3: Risk Factor
  riskFactor: {
    gstVatCertificate: File | null;
    incorporationCertificate: File | null;
  };

  // Step 4: Capability
  capability: {
    // Capability assessment data
  };

  // Step 5: Approved (Final Review)
  approved: {
    termsAccepted: boolean;
  };
}

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    StepIndicatorComponent,
    CompanyDetailsComponent,
    Step2FinancialVerificationComponent,
    Step3RiskFactorComponent,
    Step4CapabilityComponent,
    Step5ApprovedComponent,
    Sidebar
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Step management
  readonly currentStep = signal(1);
  readonly totalSteps = 5;

  // Registration data store
  readonly registrationData = signal<Partial<RegistrationData>>({
    basicInfo: { companyName: '', businessType: '', registrationNumber: '', dateOfIncorporation: '', industryCategory: '', natureOfBusiness: '' },
    addresses: {
      registeredAddress: '',
      operationalAddress: '',
      country: '',
      state: '',
      city: '',
      pin: '',
      contactPerson: '',
      designation: '',
      email: '',
      phone: '',
      alternateContact: ''
    },
    financialVerification: { panCard: null, udyamMsme: null, businessLicense: null, supportDocument: null },
    riskFactor: { gstVatCertificate: null, incorporationCertificate: null },
    capability: {},
    approved: { termsAccepted: false }
  });

  readonly step1Data = computed(() => ({
    ...(this.registrationData().basicInfo || {}),
    ...(this.registrationData().addresses || {})
  }));

  // Computed: Check if current step is valid
  readonly isCurrentStepValid = computed(() => {
    const step = this.currentStep();
    const data = this.registrationData();

    switch (step) {
      case 1:
        return this.validateBasicInfo(data.basicInfo) && this.validateAddresses(data.addresses);
      case 2:
        return this.validateFinancialVerification(data.financialVerification);
      case 3:
        return this.validateRiskFactor(data.riskFactor);
      case 4:
        return true; // Capability assessment
      case 5:
        return data.approved?.termsAccepted || false;
      default:
        return false;
    }
  });

  // Navigation methods
  nextStep(): void {
    if (this.currentStep() < this.totalSteps && this.isCurrentStepValid()) {
      this.currentStep.update(step => step + 1);
      this.scrollToTop();
    }
  }

  previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(step => step - 1);
      this.scrollToTop();
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep.set(step);
      this.scrollToTop();
    }
  }

  resetForm(): void {
    this.currentStep.set(1);
    this.registrationData.set({
      basicInfo: { companyName: '', businessType: '', registrationNumber: '', dateOfIncorporation: '', industryCategory: '', natureOfBusiness: '' },
      addresses: {
        registeredAddress: '',
        operationalAddress: '',
        country: '',
        state: '',
        city: '',
        pin: '',
        contactPerson: '',
        designation: '',
        email: '',
        phone: '',
        alternateContact: ''
      },
      financialVerification: { panCard: null, udyamMsme: null, businessLicense: null, supportDocument: null },
      riskFactor: { gstVatCertificate: null, incorporationCertificate: null },
      capability: {},
      approved: { termsAccepted: false }
    });
  }


  // Update step data
  updateStepData(step: number, data: any): void {
    this.registrationData.update(current => {
      const updated = { ...current };
      switch (step) {
        case 1:
          const identityKeys = ['companyName', 'businessType', 'registrationNumber', 'dateOfIncorporation', 'industryCategory', 'natureOfBusiness'];
          const addressKeys = ['registeredAddress', 'operationalAddress', 'country', 'state', 'city', 'pin', 'contactPerson', 'designation', 'email', 'phone', 'alternateContact'];

          const hasIdentity = identityKeys.some(k => k in data);
          const hasAddress = addressKeys.some(k => k in data);

          if (hasIdentity) {
            updated.basicInfo = { ...current.basicInfo, ...data };
          }

          if (hasAddress) {
            updated.addresses = { ...(current as any).addresses || {}, ...data };
          }

          if (!hasIdentity && !hasAddress) {
            updated.basicInfo = { ...current.basicInfo, ...data };
          }
          break;
        case 2:
          updated.financialVerification = { ...current.financialVerification, ...data };
          break;
        case 3:
          updated.riskFactor = { ...current.riskFactor, ...data };
          break;
        case 4:
          updated.capability = { ...current.capability, ...data };
          break;
        case 5:
          updated.approved = { ...current.approved, ...data };
          break;
      }
      return updated;
    });
  }


  // Validation methods
  private validateBasicInfo(data: any): boolean {
    return !!(data?.companyName && data?.businessType && data?.registrationNumber && data?.dateOfIncorporation && data?.industryCategory && data?.natureOfBusiness);
  }

  private validateAddresses(data: any): boolean {
    return !!(data?.registeredAddress && data?.city && data?.pin && data?.contactPerson && data?.email && data?.phone);
  }

  private validateFinancialVerification(data: any): boolean {
    return !!(data?.panCard && data?.udyamMsme && data?.businessLicense);
  }

  private validateRiskFactor(data: any): boolean {
    return !!(data?.gstVatCertificate && data?.incorporationCertificate);
  }

  // Submit registration
  submitRegistration(): void {
    console.log('Submitting registration:', this.registrationData());
    // TODO: Implement API call
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
