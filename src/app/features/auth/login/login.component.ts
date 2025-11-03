import { Component, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  
  // Signals
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly showDemoSection = signal(false);
  
  // Form
  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword.update(value => !value);
  }
  
  /**
   * Toggle demo section visibility
   */
  toggleDemoSection(): void {
    this.showDemoSection.update(value => !value);
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
    
    const credentials = this.loginForm.value;
    
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
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    
    if (control.errors['minlength']) {
      return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    
    return 'Invalid input';
  }
  
  /**
   * Fill demo credentials
   */
  fillDemoCredentials(role: 'vendor' | 'department'): void {
    const demoCredentials = {
      vendor: { email: 'vendor@example.com', password: 'vendor123' },
      department: { email: 'department@example.com', password: 'dept123' }
    };
    
    this.loginForm.patchValue(demoCredentials[role]);
  }
}
