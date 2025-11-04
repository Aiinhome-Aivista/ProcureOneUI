import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StepIndicatorComponent } from './components/step-indicator.component';
import { Sidebar } from './components/sidebar/sidebar';
import { IdentityDetails } from './components/steps/identity-details/identity-details';
import { BusinessTaxRegistration } from './components/steps/business-tax-registration/business-tax-registration';
import { BankIdentityVerification } from './components/steps/bank-identity-verification/bank-identity-verification';
import { FinancialDocuments } from './components/steps/financial-documents/financial-documents';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    StepIndicatorComponent,
    Sidebar,
    IdentityDetails,
    BusinessTaxRegistration,
    BankIdentityVerification,
    FinancialDocuments
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
