import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RegisterService } from '../../../../../../core/services';
import { BankVerificationFetchResponse } from '../../../../../../core/models';

type BankDocKey = 'cancelCheque' | 'bankStatement' | 'verifyLetter';

@Component({
  selector: 'app-bank-identity-verification',
  imports: [CommonModule],
  templateUrl: './bank-identity-verification.html',
  styleUrl: './bank-identity-verification.css',
})
export class BankIdentityVerification implements OnInit {
  private readonly registerService = inject(RegisterService);

  readonly isLoadingExisting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  uploadedFiles: Record<BankDocKey, File | null> = this.createEmptyFileState();
  existingDocuments: Record<BankDocKey, string | null> = this.createEmptyDocumentState();

  ngOnInit(): void {
    this.loadExistingBankDocs();
  }

  onFileChange(field: BankDocKey, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.setError('Only PDF files are allowed');
      input.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.setError('File size should not exceed 5MB');
      input.value = '';
      return;
    }

    this.uploadedFiles[field] = file;
    this.clearMessages();
  }

  removeFile(field: BankDocKey) {
    this.uploadedFiles[field] = null;
    this.clearMessages();
  }

  public resetForm(): void {
    this.uploadedFiles = this.createEmptyFileState();
    this.clearMessages();
  }

  public isValid(): boolean {
    return !!(
      this.uploadedFiles.cancelCheque &&
      this.uploadedFiles.bankStatement &&
      this.uploadedFiles.verifyLetter
    );
  }

  private loadExistingBankDocs(): void {
    const vendorId = sessionStorage.getItem('vendorId');
    if (!vendorId) {
      this.clearExistingDocuments();
      return;
    }

    this.isLoadingExisting.set(true);

    this.registerService.getBankDetails().subscribe({
      next: (response: BankVerificationFetchResponse) => {
        if (response.isSuccess && response.data?.length) {
          const bankData = response.data[0]?.bank_verification;
          if (bankData) {
            this.existingDocuments = {
              cancelCheque: bankData.cancelled_cheque_doc_url || '',
              bankStatement: bankData.bank_statement_doc_url || '',
              verifyLetter: bankData.bank_verification_letter_doc_url || ''
            };
          }
        }
      },
      error: (err) => {
        console.error('Error fetching bank verification docs:', err);
      }
    });
  }

  private createEmptyFileState(): Record<BankDocKey, File | null> {
    return {
      cancelCheque: null,
      bankStatement: null,
      verifyLetter: null,
    };
  }

  private createEmptyDocumentState(): Record<BankDocKey, string | null> {
    return {
      cancelCheque: null,
      bankStatement: null,
      verifyLetter: null,
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

  private setError(message: string): void {
    this.errorMessage.set(message);
    this.successMessage.set(null);
  }

  private clearMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
