import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-financial-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step2-financial-verification.component.html',
  styleUrls: ['./step2-financial-verification.component.css']
})
export class Step2FinancialVerificationComponent {
     data = input<any>({});
  dataChange = output<any>();
}