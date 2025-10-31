import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../../core/services/auth.service';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-department-dashboard',
  imports: [CommonModule],
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})
export class DepartmentDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  
  readonly currentUser = this.authService.currentUser;
  
  readonly stats = signal([
    { title: 'Pending Requests', value: 24, change: 5, icon: 'pending_actions', color: 'orange' },
    { title: 'Approved Today', value: 18, change: 12, icon: 'task_alt', color: 'green' },
    { title: 'Total Budget', value: '$250K', change: 0, icon: 'account_balance', color: 'blue' },
    { title: 'Active Projects', value: 12, change: 3, icon: 'work', color: 'purple' }
  ]);
  
  readonly pendingRequests = signal([
    { id: 'REQ-001', title: 'Office Supplies', requester: 'John Doe', amount: 450, priority: 'High', date: '2025-10-28' },
    { id: 'REQ-002', title: 'Software License', requester: 'Jane Smith', amount: 1200, priority: 'Medium', date: '2025-10-29' },
    { id: 'REQ-003', title: 'Equipment Upgrade', requester: 'Mike Johnson', amount: 3500, priority: 'Low', date: '2025-10-30' },
  ]);
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    // Load department-specific data
  }
  
  getPriorityClass(priority: string): string {
    const classes: Record<string, string> = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return classes[priority] || 'bg-gray-100 text-gray-800';
  }
  
  getCardColorClass(color: string): string {
    const classes: Record<string, string> = {
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'purple': 'bg-purple-500',
      'orange': 'bg-orange-500'
    };
    return classes[color] || 'bg-gray-500';
  }
}
