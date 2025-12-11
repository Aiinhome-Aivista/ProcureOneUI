import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCardData, dashboardData } from '../../../../../data/data';
import { DepartmentService } from '../../../../../core/services';

@Component({
  selector: 'app-top-card',
  imports: [CommonModule],
  templateUrl: './top-card.html',
  styleUrl: './top-card.css',
  standalone: true
})
export class TopCard implements OnInit {
  @Input() userType: 'vendor' | 'manager' | 'department' = 'manager';

  private readonly departmentService = inject(DepartmentService);

  topCards: TopCardData[] = dashboardData.topCards;

  ngOnInit(): void {
    switch (this.userType) {
      case 'vendor':
        this.topCards = dashboardData.topCards;
        break;
      case 'manager':
        this.getVendorRegCount();
        break;
      default:
        this.topCards = dashboardData.topCards;
    }
  }

  getVendorRegCount(): void {
    this.departmentService.vendorRegCount().subscribe({
      next: (response) => {
        if (response.isSuccess && response.data) {
          this.topCards = response.data.map((item) => ({
            id: item.id,
            title: item.title,
            mainValue: item.mainValue,
            stats: (item.stats?.approved !== undefined || item.stats?.rejected !== undefined) 
              ? {
                  approved: item.stats.approved || 0,
                  rejected: item.stats.rejected || 0
                }
              : undefined,
            lastValue: (item.lastValue?.label || item.lastValue?.value)
              ? {
                  label: item.lastValue.label || '',
                  value: item.lastValue.value || '',
                  trend: item.lastValue.trend as 'up' | 'down' | undefined
                }
              : undefined,
            additionalValue: (item.additionalValue?.label || item.additionalValue?.value)
              ? {
                  label: item.additionalValue.label || '',
                  value: item.additionalValue.value || ''
                }
              : undefined
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching vendor registration count:', err);
      }
    });
  }


}
