import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step1-basic-info',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Basic Information</h2>
        <p class="text-sm text-gray-600 mt-1">Provide your basic company details</p>
      </div>
      
      <form [formGroup]="form" class="space-y-5">
        <!-- Company Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            formControlName="companyName"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter company name"
          />
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            formControlName="email"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="company@example.com"
          />
        </div>
        
        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            formControlName="phone"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        
        <!-- Address -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            formControlName="address"
            rows="3"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter complete address"
          ></textarea>
        </div>
      </form>
    </div>
  `
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
