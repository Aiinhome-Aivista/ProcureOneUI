import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  
  readonly currentUser = this.authService.currentUser;
  
  readonly stats = signal([
    { title: 'Total Users', value: 1247, change: 8, icon: 'group', color: 'blue' },
    { title: 'Active Vendors', value: 89, change: 5, icon: 'store', color: 'green' },
    { title: 'Departments', value: 24, change: 2, icon: 'business', color: 'purple' },
    { title: 'System Health', value: '98%', change: 1, icon: 'health_and_safety', color: 'teal' }
  ]);
  
  readonly recentActivity = signal([
    { action: 'New user registered', user: 'john.doe@example.com', time: '5 mins ago', type: 'user' },
    { action: 'Vendor approved', user: 'ABC Supplies', time: '15 mins ago', type: 'vendor' },
    { action: 'Department created', user: 'Marketing Team', time: '1 hour ago', type: 'department' },
    { action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'system' },
  ]);
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    // Load admin-specific data
  }
  
  getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      'user': 'person_add',
      'vendor': 'store',
      'department': 'business',
      'system': 'settings'
    };
    return icons[type] || 'info';
  }
  
  getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      'user': 'bg-blue-100 text-blue-600',
      'vendor': 'bg-green-100 text-green-600',
      'department': 'bg-purple-100 text-purple-600',
      'system': 'bg-gray-100 text-gray-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  }
  
  getCardColorClass(color: string): string {
    const classes: Record<string, string> = {
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'purple': 'bg-purple-500',
      'teal': 'bg-teal-500'
    };
    return classes[color] || 'bg-gray-500';
  }
}
