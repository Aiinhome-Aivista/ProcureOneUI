import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3-risk-factor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step3-risk-factor.component.html',
  styleUrls: ['./step3-risk-factor.component.css']
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
