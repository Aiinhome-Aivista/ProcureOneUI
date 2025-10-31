import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departments',
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Department Management</h1>
      <p class="text-gray-600">Manage departments and their settings.</p>
    </div>
  `
})
export class DepartmentsComponent {}
