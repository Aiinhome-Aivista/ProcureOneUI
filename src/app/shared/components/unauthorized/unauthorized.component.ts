import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Unauthorized Access</h2>
        <p class="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <a routerLink="/login" class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
          Go to Login
        </a>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}
