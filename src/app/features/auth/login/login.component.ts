import { Component, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterService } from '../../../core/services/register.service';
import { InputOtpModule } from 'primeng/inputotp';
import {
  VendorOtpRequest,
  VendorOtpResponse,
  VerifyVendorOtpRequest,
  VerifyVendorOtpResponse,
  VendorRegistrationTrackerResponse,
  VendorRegistrationTrackerStep,
} from '../../../core/models';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule, InputOtpModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly registerService = inject(RegisterService);
  public initialId = '';
  public otpValue = '';
  readonly otpLength = 6;

  // Signals
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isOtpSending = signal(false);
  readonly isOtpVerifying = signal(false);
  readonly hasRequestedOtp = signal(false);
  readonly otpMessage = signal<string | null>(null);
  readonly otpError = signal<string | null>(null);

  // Form
  readonly loginForm: FormGroup = this.fb.group({
    vendorId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { vendorId, password } = this.loginForm.value;
    const credentials = { username: vendorId, password };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isSubmitting.set(false);
      },
      error: (error: Error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(error.message || 'Login failed. Please try again.');
      },
    });
  }

  /**
   * Mark all fields as touched to show validation errors
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      if (fieldName === 'vendorId') {
        return 'Vendor ID is required';
      }
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (control.errors['minlength']) {
      return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;
    }

    return 'Invalid input';
  }

  isExpanded = false;

  toggleExpand(event?: MouseEvent) {
    // Prevent header's click from firing twice when clicking the button
    if (event) {
      event.stopPropagation();
    }

    this.isExpanded = !this.isExpanded;
    console.log('toggleExpand ->', this.isExpanded);
  }

  sendOnboardingOtp(): void {
    const vendorId = this.initialId.trim();

    if (!vendorId) {
      this.otpError.set('Vendor ID is required to request an OTP.');
      this.otpMessage.set(null);
      return;
    }

    this.isOtpSending.set(true);
    this.otpError.set(null);
    this.otpMessage.set(null);

    const payload: VendorOtpRequest = { vendor_id: vendorId };

    this.registerService.sendVendorOtp(payload).subscribe({
      next: (response: VendorOtpResponse) => {
        this.isOtpSending.set(false);
        if (this.isApiSuccess(response)) {
          this.hasRequestedOtp.set(true);
          this.otpMessage.set(response.message || 'OTP sent successfully.');
          this.otpValue = '';
        } else {
          this.otpError.set(response.message || 'Unable to send OTP. Please try again.');
        }
      },
      error: (error: unknown) => {
        this.isOtpSending.set(false);
        this.otpError.set(this.extractErrorMessage(error, 'Unable to send OTP. Please try again.'));
      },
    });
  }

  verifyOnboardingOtp(): void {
    const vendorId = this.initialId.trim();

    if (!vendorId) {
      this.otpError.set('Vendor ID is required before verifying the OTP.');
      return;
    }

    if (!this.isOtpReady) {
      this.otpError.set(`Enter the ${this.otpLength}-digit OTP to continue.`);
      return;
    }

    this.isOtpVerifying.set(true);
    this.otpError.set(null);

    const payload: VerifyVendorOtpRequest = {
      vendor_id: vendorId,
      otp: this.otpValue.trim(),
    };

    this.registerService.verifyVendorOtp(payload).subscribe({
      next: (response: VerifyVendorOtpResponse) => {
        this.isOtpVerifying.set(false);
        if (this.isApiSuccess(response)) {
          this.otpMessage.set(response.message || 'OTP verified successfully.');
          const resolvedVendorId = response.vendor_id || vendorId;
          sessionStorage.setItem('vendorId', resolvedVendorId);
          this.fetchTrackerAndNavigate(resolvedVendorId, response.current_step);
        } else {
          this.otpError.set(response.message || 'OTP verification failed. Please try again.');
        }
      },
      error: (error: unknown) => {
        this.isOtpVerifying.set(false);
        this.otpError.set(
          this.extractErrorMessage(error, 'Unable to verify OTP. Please try again.')
        );
      },
    });
  }

  handleInitialIdInput(): void {
    if (this.hasRequestedOtp()) {
      this.hasRequestedOtp.set(false);
    }
    this.otpValue = '';
    this.otpMessage.set(null);
    this.otpError.set(null);
  }

  get isOtpReady(): boolean {
    return this.otpValue.trim().length === this.otpLength;
  }

  private resolveStepNumber(stepCode?: string | null): number {
    if (!stepCode) {
      return 1;
    }

    const normalized = stepCode.trim().toUpperCase();
    const mapping: Record<string, number> = {
      BASIC_INFO: 1,
      IDENTITY_DETAILS: 1,
      TAX_DOCS: 2,
      BUSINESS_TAX: 2,
      BANK_VERIFICATION: 3,
      BANK_VERIF: 3,
      BANK_DOCS: 3,
      FINANCIAL_PERF: 4,
      FINAL_SUBMISSION: 4,
      PREVIEW: 5,
      SUBMITTED: 6,
    };

    return mapping[normalized] ;
  }

  private fetchTrackerAndNavigate(vendorId: string, fallbackStepCode?: string | null): void {
    this.registerService.getVendorRegistrationTracker(vendorId).subscribe({
      next: (trackerResponse: VendorRegistrationTrackerResponse) => {
        const activeStepCode = this.findActiveStepCode(trackerResponse.data) || fallbackStepCode;
        this.navigateToRegistrationStep(activeStepCode);
      },
      error: () => {
        this.navigateToRegistrationStep(fallbackStepCode);
      },
    });
  }

  private findActiveStepCode(steps?: VendorRegistrationTrackerStep[]): string | null {
    if (!steps || steps.length === 0) {
      return null;
    }

    // 1. Check if SUBMITTED exists
    const submittedStep = steps.find((s) => s.step_code === 'SUBMITTED' && s.status?.toLowerCase() === 'in progress');
    if (submittedStep) {
      return 'SUBMITTED';
    }

    // 2. Check if all 4 main sections are Completed
 
 const previewStep = steps.find((s) => s.step_code === 'PREVIEW' && s.status?.toLowerCase() === 'in progress');
    if (previewStep) {
      return 'PREVIEW';
    }

    // 3. Fallback to existing logic (find first In Progress or Completed)
    const prioritizedStatuses = ['in progress', 'completed'];

    for (const status of prioritizedStatuses) {
      const match = steps.find((step) => step.status?.toLowerCase() === status);
      if (match?.step_code) {
        return match.step_code;
      }
    }

    return steps[0].step_code || null;
  }

  private navigateToRegistrationStep(stepCode?: string | null): void {
    const stepNumber = this.resolveStepNumber(stepCode);
    sessionStorage.setItem('currentStep', stepNumber.toString());
    this.router.navigate(['/register'], { queryParams: { step: stepNumber } });
  }

  private isApiSuccess(response: { isSuccess?: boolean | string; status?: string }): boolean {
    if (typeof response.isSuccess === 'boolean') {
      return response.isSuccess;
    }

    if (typeof response.isSuccess === 'string') {
      return response.isSuccess.toLowerCase() === 'true';
    }

    if (response.status) {
      return response.status.toLowerCase() === 'success';
    }

    return false;
  }

  private extractErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.message || error.message || fallback;
    }

    if (error instanceof Error) {
      return error.message || fallback;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as { message?: string }).message;
      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    return fallback;
  }


  onRegister(): void {
    sessionStorage.clear();
    this.router.navigate(['/register']);
  }
}
