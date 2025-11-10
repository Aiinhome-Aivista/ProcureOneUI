import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LeftSidebar } from "./dashboard-child/left-sidebar/left-sidebar";
import { TopCard } from "./dashboard-child/top-card/top-card";
import { BidingPerformanceGraph } from "./dashboard-child/biding-performance-graph/biding-performance-graph";
import { BidingStatus } from "./dashboard-child/biding-status/biding-status";
import { BidingHistory } from "./dashboard-child/biding-history/biding-history";

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-vendor-dashboard',
  imports: [CommonModule, LeftSidebar, TopCard, BidingPerformanceGraph, BidingStatus, BidingHistory],
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  
  readonly currentUser = this.authService.currentUser;
  readonly isLoading = signal(false);
  
  readonly stats = signal<StatCard[]>([
    { title: 'Total Products', value: 127, change: 12, icon: 'inventory_2', color: 'blue' },
    { title: 'Active Orders', value: 43, change: 8, icon: 'shopping_cart', color: 'green' },
    { title: 'Revenue', value: '$12,450', change: 23, icon: 'payments', color: 'purple' },
    { title: 'Pending Reviews', value: 8, change: -5, icon: 'rate_review', color: 'orange' }
  ]);
  
  readonly recentOrders = signal([
    { id: '#ORD-001', customer: 'ABC Corp', amount: 1250, status: 'Delivered', date: '2025-10-28' },
    { id: '#ORD-002', customer: 'XYZ Ltd', amount: 3200, status: 'Processing', date: '2025-10-29' },
    { id: '#ORD-003', customer: 'Tech Solutions', amount: 890, status: 'Shipped', date: '2025-10-30' },
  ]);
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    this.isLoading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
  
  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'Delivered': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
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
