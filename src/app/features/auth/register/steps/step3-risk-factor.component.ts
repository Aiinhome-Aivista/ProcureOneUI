import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3-risk-factor',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Risk Factor Assessment</h2>
        <p class="text-sm text-gray-600 mt-1">Upload compliance and registration documents</p>
      </div>
      
      <!-- GST / VAT Registration Certificate -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">GST / VAT Registration Certificate *</label>
        </div>
        <p class="text-xs text-gray-500 mb-3">Validates indirect tax compliance</p>
        <input type="file" accept=".pdf,.jpg,.png" class="text-sm" (change)="onFileChange('gstVatCertificate', $event)" />
      </div>
      
      <!-- Certificate of Incorporation -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-gray-700">Certificate of Incorporation *</label>
        </div>
        <p class="text-xs text-gray-500 mb-3">Legal proof of company existence</p>
        <input type="file" accept=".pdf,.jpg,.png" class="text-sm" (change)="onFileChange('incorporationCertificate', $event)" />
      </div>
    </div>
  `
})
export class Step3RiskFactorComponent {
  data = input<any>({});
  dataChange = output<any>();
  
  onFileChange(field: string, event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.dataChange.emit({ [field]: file });
    }
  }
}
