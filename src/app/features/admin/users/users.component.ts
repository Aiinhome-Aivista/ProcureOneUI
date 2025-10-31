import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">User Management</h1>
      <p class="text-gray-600">Manage system users and permissions.</p>
    </div>
  `
})
export class UsersComponent {}
