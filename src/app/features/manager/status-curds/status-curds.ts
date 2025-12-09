import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatusCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'success' | 'warning';
}

@Component({
  selector: 'app-status-curds',
  imports: [CommonModule],
  templateUrl: './status-curds.html',
  styleUrl: './status-curds.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusCurds {
  readonly statusCards = signal<StatusCard[]>([
    {
      id: 1,
      title: 'Basic Document Check',
      description: 'All required documents are present and valid. No issue found.',
      icon: 'check_circle',
      status: 'success'
    },
    {
      id: 2,
      title: 'Financial Check',
      description: 'Credit score and revenue figures meet requirements.',
      icon: 'check_circle',
      status: 'success'
    },
    {
      id: 3,
      title: 'Risk Factor Analysis',
      description: 'Minor risk identified: operations in politically unstable region.',
      icon: 'warning',
      status: 'warning'
    },
    {
      id: 4,
      title: 'Capability Calculation',
      description: 'Vendor capacity is sufficient for projected contract sizes.',
      icon: 'check_circle',
      status: 'success'
    }
  ]);

  getCardClass(status: 'success' | 'warning'): string {
    return status === 'success' ? 'bg-white' : 'bg-white';
  }

  getIconClass(status: 'success' | 'warning'): string {
    return status === 'success' ? 'text-green-500' : 'text-yellow-500';
  }
}
