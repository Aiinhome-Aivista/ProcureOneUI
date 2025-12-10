import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCardData, dashboardData } from '../../../../../data/data';

@Component({
  selector: 'app-top-card',
  imports: [CommonModule],
  templateUrl: './top-card.html',
  styleUrl: './top-card.css',
  standalone: true
})
export class TopCard implements OnInit {
  @Input() userType: 'vendor' | 'manager' | 'department' = 'manager';

  topCards: TopCardData[] = dashboardData.topCards;

  ngOnInit(): void {
    switch (this.userType) {
      case 'vendor':
        this.topCards = dashboardData.topCards;
        break;
      case 'manager':
        this.topCards = [
          {
            id: 'submitted',
            title: "Submitted",
            mainValue: 139,
            stats: {
              approved: 57,
              rejected: 18
            }
          },
          {
            id: 'completed',
            title: "Completed",
            mainValue: 129,
            lastValue: {
              value: 25,
              label: "Last Qatar Total Number of Completed Task",
              trend: 'up' as const
            }
          },
          {
            id: 'duration',
            title: "Duration",
            mainValue: "18h 19m",
            lastValue: {
              value: "5h",
              label: "Last Duration",
              trend: 'up' as const
            }
          },
          {
            id: 'approvals',
            title: "Approvals",
            mainValue: "3d 12h 22m",
            lastValue: {
              value: "2 Days",
              label: "Lowest Time"
            },
            additionalValue: {
              value: "5 Days",
              label: "Highest Time"
            }
          }
        ];
        break;
      default:
        this.topCards = dashboardData.topCards;
    }
  }
}
