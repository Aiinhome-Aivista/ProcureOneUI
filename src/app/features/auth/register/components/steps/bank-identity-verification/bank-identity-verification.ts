import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-identity-verification',
  imports: [],
  templateUrl: './bank-identity-verification.html',
  styleUrl: './bank-identity-verification.css',
})
export class BankIdentityVerification {
  uploadedFiles: any = {
    cancelCheque: null,
    bankStatement: null,
    verifyLetter: null
  };

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
}
