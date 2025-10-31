import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  // Signals
  readonly isSidebarOpen = signal(true);
  readonly showUserMenu = signal(false);
  
  // Computed
  readonly currentUser = this.authService.currentUser;
  readonly userRole = this.authService.userRole;
  readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  });
  
  // Navigation items based on role
  readonly navigationItems = computed(() => {
    const role = this.userRole();
    
    const commonItems = [
      { label: 'Dashboard', icon: 'dashboard', route: `/${role}/dashboard` },
      { label: 'Profile', icon: 'person', route: `/${role}/profile` },
    ];
    
    const roleSpecificItems: Record<string, Array<{ label: string; icon: string; route: string }>> = {
      vendor: [
        { label: 'Products', icon: 'inventory', route: '/vendor/products' },
        { label: 'Orders', icon: 'shopping_cart', route: '/vendor/orders' },
        { label: 'Analytics', icon: 'analytics', route: '/vendor/analytics' },
      ],
      department: [
        { label: 'Requests', icon: 'assignment', route: '/department/requests' },
        { label: 'Approvals', icon: 'task_alt', route: '/department/approvals' },
        { label: 'Reports', icon: 'description', route: '/department/reports' },
      ]
    };
    
    return role ? [...commonItems, ...(roleSpecificItems[role] || [])] : commonItems;
  });
  
  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }
  
  toggleUserMenu(): void {
    this.showUserMenu.update(value => !value);
  }
  
  logout(): void {
    this.authService.logout();
  }
  
  getRoleBadgeClass(): string {
    const role = this.userRole();
    const classes: Record<string, string> = {
      vendor: 'bg-green-100 text-green-800',
      department: 'bg-blue-100 text-blue-800'
    };
    return role ? classes[role] : 'bg-gray-100 text-gray-800';
  }
}
