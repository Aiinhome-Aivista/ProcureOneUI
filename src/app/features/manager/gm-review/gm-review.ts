import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gm-review',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gm-review.html',
  styleUrl: './gm-review.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GmReview {
  private fb = inject(FormBuilder);

  readonly reviewForm: FormGroup = this.fb.group({
    gmNotes: ['', Validators.required],
    initialAssessment: ['', Validators.required],
    reviewSegment: ['', Validators.required]
  });

  readonly isSubmitting = signal(false);

  sendForResubmition(): void {
    if (this.reviewForm.valid) {
      this.isSubmitting.set(true);
      console.log('Send for Resubmition:', this.reviewForm.value);
      // API call here
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }

  rejectApplication(): void {
    if (this.reviewForm.valid) {
      this.isSubmitting.set(true);
      console.log('Reject Application:', this.reviewForm.value);
      // API call here
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }

  approveVendor(): void {
    if (this.reviewForm.valid) {
      this.isSubmitting.set(true);
      console.log('Approve Vendor:', this.reviewForm.value);
      // API call here
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }
}
