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
  readonly isSidebarOpen = signal(false);
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


  activeMenu = 'dashboard';

  // Quick action bar items (can be customized by drag and drop)
  readonly quickActionItems = signal([
    { id: 'dashboard', icon: 'dashboard' },
    { id: 'bidding', icon: 'gavel' },
    { id: 'support', icon: 'support_agent' },
    { id: 'settings', icon: 'settings' },
  ]);

  // Expanded sidebar menu items
  readonly expandedMenuItems = signal([
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'reports', label: 'Report It', icon: 'description' },
    { id: 'support', label: 'Support', icon: 'support_agent' },
    { id: 'bidding', label: 'Bidding', icon: 'gavel', },
    { id: 'connect', label: 'Connect', icon: 'share' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'registration', label: 'Registration', icon: 'lock' },
  ]);





  setActive(menu: string) {
    this.activeMenu = menu;
  }

  navigate(item: any) {
    console.log('Navigating to', item.label);
  }

  // Drag and Drop functionality for quick actions
  onDragStart(event: DragEvent, itemId: string): void {
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/plain', itemId);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDropToQuickActions(event: DragEvent): void {
    event.preventDefault();
    const itemId = event.dataTransfer!.getData('text/plain');
    
    // Check if item already exists in quick actions
    const exists = this.quickActionItems().some(item => item.id === itemId);
    if (exists) return;

    // Find the item from expanded menu
    const menuItem = this.expandedMenuItems().find(item => item.id === itemId);
    if (menuItem) {
      this.quickActionItems.update(items => [
        ...items,
        { id: menuItem.id, icon: menuItem.icon }
      ]);
    }
  }

  removeFromQuickActions(itemId: string): void {
    this.quickActionItems.update(items => 
      items.filter(item => item.id !== itemId)
    );
  }

  isInQuickActions(itemId: string): boolean {
    return this.quickActionItems().some(item => item.id === itemId);
  }
}
