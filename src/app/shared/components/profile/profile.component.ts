import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Profile</h1>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <p class="mt-1 text-gray-900">{{ currentUser()?.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-gray-900">{{ currentUser()?.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <p class="mt-1 text-gray-900 capitalize">{{ currentUser()?.role }}</p>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;
}
