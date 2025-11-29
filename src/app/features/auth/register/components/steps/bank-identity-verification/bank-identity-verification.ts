import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../../../../core/services';
import { BankVerificationFetchResponse } from '../../../../../../core/models';

@Component({
  selector: 'app-bank-identity-verification',
  imports: [],
  templateUrl: './bank-identity-verification.html',
  styleUrl: './bank-identity-verification.css',
})
export class BankIdentityVerification implements OnInit {
  uploadedFiles: any = {
    cancelCheque: null,
    bankStatement: null,
    verifyLetter: null
  };

  existingDocs = {
    cancelCheque: '',
    bankStatement: '',
    verifyLetter: ''
  };

  constructor(private readonly registerService: RegisterService) {}

  ngOnInit(): void {
    this.loadExistingBankDocs();
  }

  onFileChange(field: string, event: any) {
    const file: File = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size should not exceed 5MB");
      return;
    }

    this.uploadedFiles[field] = file;
  }

  removeFile(field: string) {
    this.uploadedFiles[field] = null;
  }

  public resetForm(): void {
    this.uploadedFiles = {
      cancelCheque: null,
      bankStatement: null,
      verifyLetter: null,
    };
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
      return;
    }

    this.registerService.getBankDetails().subscribe({
      next: (response: BankVerificationFetchResponse) => {
        if (response.isSuccess && response.data?.length) {
          const bankData = response.data[0]?.bank_verification;
          if (bankData) {
            this.existingDocs = {
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
}
