import { Component } from '@angular/core';

@Component({
  selector: 'app-financial-documents',
  imports: [],
  templateUrl: './financial-documents.html',
  styleUrl: './financial-documents.css',
})
export class FinancialDocuments {
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
}
