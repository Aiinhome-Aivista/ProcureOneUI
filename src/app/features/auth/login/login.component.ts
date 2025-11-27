import { Component, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  public initialId = signal('');

  // Signals
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Form
  readonly loginForm: FormGroup = this.fb.group({
    vendorId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { vendorId, password } = this.loginForm.value;
    const credentials = { username: vendorId, password };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isSubmitting.set(false);
      },
      error: (error: Error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(error.message || 'Login failed. Please try again.');
      }
    });
  }

  /**
   * Mark all fields as touched to show validation errors
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      if (fieldName === 'vendorId') {
        return 'Vendor ID is required';
      }
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (control.errors['minlength']) {
      return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;
    }

    return 'Invalid input';
  }

  isExpanded = false;

  toggleExpand(event?: MouseEvent) {
    // Prevent header's click from firing twice when clicking the button
    if (event) {
      event.stopPropagation();
    }

    this.isExpanded = !this.isExpanded;
    console.log('toggleExpand ->', this.isExpanded);
  }


  checkStatus(initialId: string) {
    sessionStorage.setItem('vendorId', initialId);
    this.router.navigateByUrl('/register')
  }
}
