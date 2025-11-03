import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-financial-verification',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Financial Verification</h2>
        <p class="text-sm text-gray-600 mt-1">Upload required financial documents</p>
      </div>
      
      <!-- PAN Card -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">PAN Card (or equivalent tax ID) *</label>
        </div>
        <p class="text-xs text-gray-500 mb-3">Confirms tax registration and identity</p>
        <input type="file" accept=".pdf,.jpg,.png" class="text-sm" (change)="onFileChange('panCard', $event)" />
      </div>
      
      <!-- Udyam / MSME Registration -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Udyam / MSME Registration (if applicable) *</label>
        </div>
        <p class="text-xs text-gray-500 mb-3">Confirms small/medium enterprise status</p>
        <input type="file" accept=".pdf,.jpg,.png" class="text-sm" (change)="onFileChange('udyamMsme', $event)" />
      </div>
      
      <!-- Business License / Trade License -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Business License / Trade License *</label>
        </div>
        <p class="text-xs text-gray-500 mb-3">Confirms legal authorization to operate</p>
        <input type="file" accept=".pdf,.jpg,.png" class="text-sm" (change)="onFileChange('businessLicense', $event)" />
      </div>
      
      <!-- Support Document -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Support Document *</label>
        </div>
        <p class="text-xs text-gray-500 mb-3">PDF/MAX 10MB</p>
        <input type="file" accept=".pdf" class="text-sm" (change)="onFileChange('supportDocument', $event)" />
      </div>
    </div>
  `
})
export class Step2FinancialVerificationComponent {
  data = input<any>({});
  dataChange = output<any>();
  
  onFileChange(field: string, event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.dataChange.emit({ [field]: file });
    }
  }
}
