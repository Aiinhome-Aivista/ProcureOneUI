import { Component, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
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
  // Live clock: current date/time
  readonly now = signal(new Date());
  readonly currentDate = computed(() => this.formatDate(this.now()));
  readonly currentTime = computed(() => this.formatTime(this.now()));
  private _timerId: any;
  // Step management
  readonly currentStep = signal(1);
  readonly totalSteps = 5;

  // Registration data store
  readonly registrationData = signal<Partial<RegistrationData>>({
    basicInfo: { companyName: '', businessType: '', registrationNumber: '', dateOfIncorporation: '', industryCategory: '', natureOfBusiness: '' },
    financialVerification: { panCard: null, udyamMsme: null, businessLicense: null, supportDocument: null },
    riskFactor: { gstVatCertificate: null, incorporationCertificate: null },
    capability: {},
    approved: { termsAccepted: false }
  });

  // Computed: Check if current step is valid
  readonly isCurrentStepValid = computed(() => {
    const step = this.currentStep();
    const data = this.registrationData();

    switch (step) {
      case 1:
        return this.validateBasicInfo(data.basicInfo);
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

  constructor() {
    this.startClock();
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
          updated.basicInfo = { ...current.basicInfo, ...data };
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

  // --- Clock helpers ---
  private startClock(): void {
    // update every second so time changes are reflected and date rolls over correctly
    this._timerId = setInterval(() => this.now.set(new Date()), 1000);
  }

  private formatDate(d: Date): string {
    const day = d.getDate();
    const month = d.toLocaleString('en-GB', { month: 'long' });
    const suffix = this.getDaySuffix(day);
    return `${day}${suffix} ${month}`;
  }

  private formatTime(d: Date): string {
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const mins = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${mins} ${ampm}`;
  }

  private getDaySuffix(d: number): string {
    if (d >= 11 && d <= 13) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  ngOnDestroy(): void {
    if (this._timerId) {
      clearInterval(this._timerId);
    }
  }
}
