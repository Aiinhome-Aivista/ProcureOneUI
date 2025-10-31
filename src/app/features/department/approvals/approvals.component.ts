import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approvals',
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Approvals</h1>
      <p class="text-gray-600">Review and approve pending requests.</p>
    </div>
  `
})
export class ApprovalsComponent {}
