import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step1-basic-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1-basic-info.component.html',
  styleUrls: ['./step1-basic-info.component.css']
})
export class Step1BasicInfoComponent {
  data = input<any>({});
  dataChange = output<any>();
  
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
    
    // Emit changes
    this.form.valueChanges.subscribe(value => {
      this.dataChange.emit(value);
    });
  }
}
