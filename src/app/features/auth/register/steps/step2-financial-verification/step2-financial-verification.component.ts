import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-financial-verification',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step2-financial-verification.component.html',
  styleUrls: ['./step2-financial-verification.component.css']
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
