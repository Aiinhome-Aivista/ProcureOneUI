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
  selectedFileName: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      pan: ['', Validators.required],
      gst: ['', Validators.required],
      udyam: ['', Validators.required],
      incorp: ['', Validators.required],
      tradeLicense: ['', Validators.required],
      supportedDocument: [null, Validators.required]
    });
  }

  // --- handles normal file browse upload ---
  onFileChange(controlName: string, event: any) {
    const file = event.target.files?.[0] ?? null;
    this.setFile(controlName, file);
  }

  // --- drop handling for drag-drop ---
  handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0] ?? null;
    this.setFile('supportedDocument', file);
  }

  // needed for allowing drop
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  // private setFile(controlName: string, file: File | null) {
  //   if (!file) return;

  //   // validate PDF
  //   if (file.type !== 'application/pdf') return;

  //   // validate size 10MB
  //   if (file.size > 10 * 1024 * 1024) return;

  //   this.form.get(controlName)?.setValue(file);
  //   this.form.get(controlName)?.markAsTouched();

  //   this.dataChange.emit({ [controlName]: file });
  // }
  private setFile(controlName: string, file: File | null) {
  if (!file) return;

  if (file.type !== 'application/pdf') return;
  if (file.size > 10 * 1024 * 1024) return;

  this.form.get(controlName)?.setValue(file);
  this.form.get(controlName)?.markAsTouched();

  this.selectedFileName = file.name; // ✅ here

  this.dataChange.emit({ [controlName]: file });
}
  readonly incorporationTypes = [
    { value: 'private', label: 'Private Limited Company' },
    { value: 'public', label: 'Public Limited Company' },
    { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
    { value: 'partnership', label: 'Partnership Firm' },
  ];


  
}
