import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RegisterService } from '../../../../../../core/services';
import { FinancialDocumentsResponse } from '../../../../../../core/models';

type FinancialDocKey =
  | 'auditedBalanceSheet'
  | 'profitLossStatement'
  | 'incomeTaxReturn'
  | 'turnoverDeclaration';

@Component({
  selector: 'app-financial-documents',
  imports: [CommonModule],
  templateUrl: './financial-documents.html',
  styleUrl: './financial-documents.css',
})
export class FinancialDocuments {
  private readonly registerService = inject(RegisterService);

  readonly isSubmitting = signal(false);
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  uploadedFiles: Record<FinancialDocKey, File | null> = {
    auditedBalanceSheet: null,
    profitLossStatement: null,
    incomeTaxReturn: null,
    turnoverDeclaration: null,
  };

  onFileChange(field: FinancialDocKey, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      this.setError('Only PDF files are allowed.');
      input.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.setError('File size should not exceed 5MB.');
      input.value = '';
      return;
    }

    this.uploadedFiles[field] = file;
    this.clearMessages();
  }

  removeFile(field: FinancialDocKey): void {
    this.uploadedFiles[field] = null;
    this.clearMessages();
  }

  submitFinancialDocs(): Observable<FinancialDocumentsResponse> | null {
    if (!this.hasAllDocuments()) {
      this.setError('Please upload all mandatory documents before submitting.');
      return null;
    }

    const vendorId = sessionStorage.getItem('vendorId');
    if (!vendorId) {
      this.setError('Vendor ID not found. Please complete previous steps first.');
      return null;
    }

    const formData = new FormData();
    formData.append('vendor_id', vendorId);
    formData.append(
      'audited_balance_sheet_file',
      this.uploadedFiles.auditedBalanceSheet as File,
      (this.uploadedFiles.auditedBalanceSheet as File).name
    );
    formData.append(
      'profit_loss_statement_file',
      this.uploadedFiles.profitLossStatement as File,
      (this.uploadedFiles.profitLossStatement as File).name
    );
    formData.append(
      'income_tax_return_file',
      this.uploadedFiles.incomeTaxReturn as File,
      (this.uploadedFiles.incomeTaxReturn as File).name
    );
    formData.append(
      'turnover_declaration_file',
      this.uploadedFiles.turnoverDeclaration as File,
      (this.uploadedFiles.turnoverDeclaration as File).name
    );

    this.isSubmitting.set(true);
    this.clearMessages();

    return this.registerService.postFinancialDocuments(formData).pipe(
      tap((response: FinancialDocumentsResponse) => {
        this.isSubmitting.set(false);
        if (this.isSuccess(response)) {
          this.successMessage.set(response.message || 'Documents uploaded successfully.');
          sessionStorage.setItem('currentStep', '4');
        } else {
          this.setError(response.message || 'Failed to upload documents. Please try again.');
        }
      }),
      catchError((error) => {
        this.isSubmitting.set(false);
        const message = error?.error?.message || 'Unable to upload documents. Please try again.';
        this.setError(message);
        return throwError(() => error);
      })
    );
  }

  canSubmitDocuments(): boolean {
    return this.hasAllDocuments();
  }

  resetFiles(): void {
    this.uploadedFiles = {
      auditedBalanceSheet: null,
      profitLossStatement: null,
      incomeTaxReturn: null,
      turnoverDeclaration: null,
    };
    this.clearMessages();
  }

  private hasAllDocuments(): boolean {
    return Object.values(this.uploadedFiles).every((file) => file instanceof File);
  }

  private isSuccess(response: FinancialDocumentsResponse): boolean {
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

  private setError(message: string): void {
    this.errorMessage.set(message);
    this.successMessage.set(null);
  }

  private clearMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
