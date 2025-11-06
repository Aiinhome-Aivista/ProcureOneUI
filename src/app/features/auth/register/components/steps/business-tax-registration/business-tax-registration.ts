import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LegalProof } from '../../../../../../core/models';
import { RegisterService } from '../../../../../../core/services/register.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-business-tax-registration',
  imports: [CommonModule, ReactiveFormsModule, SelectModule],
  templateUrl: './business-tax-registration.html',
  styleUrl: './business-tax-registration.css',
})
export class BusinessTaxRegistration {
  data = input<any>({});
  dataChange = output<any>();
  selectedFileName: string | null = null;
  incorporationTypes: LegalProof[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private certificateService: RegisterService) {
    this.form = this.fb.group({
      pan: ['', Validators.required],
      gst: ['', Validators.required],
      udyam: ['', Validators.required],
      incorp: ['', Validators.required],
      tradeLicense: ['', Validators.required],
      supportedDocument: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.incorporationCertificate();
  }

  //handles normal file browse upload
  onFileChange(controlName: string, event: any) {
    const file = event.target.files?.[0] ?? null;
    this.setFile(controlName, file);
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0] ?? null;
    this.setFile('supportedDocument', file);
  }

  // needed for allowing drop
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  private setFile(controlName: string, file: File | null) {
    if (!file) return;

    if (file.type !== 'application/pdf') return;
    if (file.size > 10 * 1024 * 1024) return;

    this.form.get(controlName)?.setValue(file);
    this.form.get(controlName)?.markAsTouched();

    this.selectedFileName = file.name;

    this.dataChange.emit({ [controlName]: file });
  }

  incorporationCertificate() {
    this.certificateService.certificateIncorporation().subscribe({
      next: (res) => {
        this.incorporationTypes = res.data;
      },
      error: (err) => {
        console.error('Error fetching incorporation certificate list', err);
      }
    });
  }

  get incorp() {
    return this.form.get('incorp');
  }


}
