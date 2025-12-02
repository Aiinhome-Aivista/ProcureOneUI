import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, of, tap, throwError } from 'rxjs';
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
export class FinancialDocuments implements OnInit {
  private readonly registerService = inject(RegisterService);

  readonly isSubmitting = signal(false);
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly isLoadingExisting = signal(false);

  uploadedFiles: Record<FinancialDocKey, File | null> = this.createEmptyFileState();
  existingDocuments: Record<FinancialDocKey, string | null> = this.createEmptyDocumentState();

  ngOnInit(): void {
    this.fetchExistingDocuments();
  }

  private fetchExistingDocuments(): void {
    const vendorId = sessionStorage.getItem('vendorId');
    if (!vendorId) {
      this.clearExistingDocuments();
      return;
    }

    this.isLoadingExisting.set(true);

    this.registerService
      .getFinancialDocuments()
      .pipe(finalize(() => this.isLoadingExisting.set(false)))
      .subscribe({
        next: (response) => {
          if (response?.isSuccess && response.data?.length) {
            const documents = response.data[0];
            this.existingDocuments = {
              auditedBalanceSheet: documents?.audited_balance_sheet_doc_url || null,
              profitLossStatement: documents?.profit_loss_statement_doc_url || null,
              incomeTaxReturn: documents?.income_tax_return_doc_url || null,
              turnoverDeclaration: documents?.turnover_declaration_doc_url || null,
            };
          } else {
            this.clearExistingDocuments();
          }
        },
        error: (error) => {
          console.error('Failed to fetch financial documents:', error);
          this.clearExistingDocuments();
        },
      });
  }

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
    const vendorId = sessionStorage.getItem('vendorId');
    if (!vendorId) {
      this.setError('Vendor ID not found. Please complete previous steps first.');
      return null;
    }

    if (!this.hasAllDocuments()) {
      if (this.hasExistingDocuments()) {
        this.successMessage.set('Financial documents are already uploaded.');
        return of({
          current_step: 'FINANCIAL_PERF',
          isSuccess: true,
          message: 'Financial documents already uploaded.',
          status: 'success',
          statusCode: 200,
          vendor_id: vendorId,
        });
      }

      this.setError('Please upload all mandatory documents before submitting.');
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
          this.uploadedFiles = this.createEmptyFileState();
          this.fetchExistingDocuments();
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
    return this.hasAllDocuments() || this.hasExistingDocuments();
  }

  resetFiles(): void {
    this.uploadedFiles = this.createEmptyFileState();
    this.clearMessages();
  }

  private hasAllDocuments(): boolean {
    return Object.values(this.uploadedFiles).every((file) => file instanceof File);
  }

  private hasExistingDocuments(): boolean {
    return Object.values(this.existingDocuments).every(
      (url) => typeof url === 'string' && url.length > 0
    );
  }

  private createEmptyFileState(): Record<FinancialDocKey, File | null> {
    return {
      auditedBalanceSheet: null,
      profitLossStatement: null,
      incomeTaxReturn: null,
      turnoverDeclaration: null,
    };
  }

  private createEmptyDocumentState(): Record<FinancialDocKey, string | null> {
    return {
      auditedBalanceSheet: null,
      profitLossStatement: null,
      incomeTaxReturn: null,
      turnoverDeclaration: null,
    };
  }

  private clearExistingDocuments(): void {
    this.existingDocuments = this.createEmptyDocumentState();
  }

  formatExistingDocumentLabel(url: string | null): string {
    if (!url) {
      return '';
    }

    const decoded = this.decodeUrl(url);
    const path = this.extractPath(decoded);
    const segments = path.split('/').filter(Boolean);
    if (!segments.length) {
      return path;
    }

    const fileName = segments.pop() as string;
    const cleanedFile = this.removePrefixFromFileName(fileName);
    const folderPath = segments.join('/');
    return folderPath ? `${folderPath}/${cleanedFile}` : cleanedFile;
  }

  private decodeUrl(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  private extractPath(value: string): string {
    const trimmed = value.replace(/^\/+/, '');
    if (/^https?:\/\//i.test(trimmed)) {
      try {
        const parsed = new URL(trimmed);
        return parsed.pathname.replace(/^\//, '');
      } catch {
        return trimmed;
      }
    }

    const hashIndex = trimmed.indexOf('://');
    if (hashIndex > -1) {
      const pathStart = trimmed.indexOf('/', hashIndex + 3);
      return pathStart > -1 ? trimmed.slice(pathStart + 1) : '';
    }

    return trimmed;
  }

  private removePrefixFromFileName(fileName: string): string {
    const separatorIndex = fileName.indexOf('_');
    return separatorIndex > -1 ? fileName.slice(separatorIndex + 1) : fileName;
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
