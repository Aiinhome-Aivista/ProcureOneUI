import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface BiddingHistoryItem {
  id: string;
  description: string;
  submissionDate: string;
  bidValue: number;
  status: 'Awarded' | 'Pending' | 'Lost';
}

@Component({
  selector: 'app-biding-history',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './biding-history.html',
  styleUrl: './biding-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidingHistory {
  // --- State Signals ---
  readonly requisitionIdFilter = signal('');
  readonly submissionDateFilter = signal('');
  readonly bidValueFilter = signal<number | null>(null);
  readonly statusFilter = signal('Status');

  private readonly biddingHistory = signal<BiddingHistoryItem[]>([
    { id: 'All-REQ-00125-2025', description: 'Office Supplies', submissionDate: '12-09-2025', bidValue: 25623, status: 'Awarded' },
    { id: 'All-REQ-00225-2025', description: 'IT Equipment', submissionDate: '23-08-2025', bidValue: 15623, status: 'Pending' },
    { id: 'All-REQ-0015-2025', description: 'Janitorial Service', submissionDate: '12-08-2025', bidValue: 8000, status: 'Lost' },
    { id: 'All-REQ-0077-2025', description: 'Office Supplies', submissionDate: '07-07-2025', bidValue: 35253, status: 'Awarded' },
  ]);

  // --- Derived State ---
  readonly filteredBiddingHistory = computed(() => {
    const requisitionId = this.requisitionIdFilter().toLowerCase();
    const submissionDate = this.submissionDateFilter();
    const bidValue = this.bidValueFilter();
    const status = this.statusFilter();

    return this.biddingHistory().filter(item => {
      const matchesRequisitionId = requisitionId === '' || item.id.toLowerCase().includes(requisitionId);
      const matchesSubmissionDate = submissionDate === '' || item.submissionDate.includes(submissionDate);
      const matchesBidValue = bidValue === null || item.bidValue >= bidValue;
      const matchesStatus = status === 'Status' || item.status === status;

      return matchesRequisitionId && matchesSubmissionDate && matchesBidValue && matchesStatus;
    });
  });

  // --- Template Helpers ---
  
  // Helper to handle the string input from the template for the bid value
  onBidValueChange(value: string): void {
    const parsedValue = parseFloat(value);
    this.bidValueFilter.set(isNaN(parsedValue) ? null : parsedValue);
  }

  getStatusClass(status: BiddingHistoryItem['status']): string {
    const statusClasses = {
      'Awarded': 'bg-[#49C50636] text-[#49C506]',
      'Pending': 'bg-[#C5C50636] text-[#C5C506]',
      'Lost': 'bg-[#C2191921] text-[#C21919]'
    };
    return statusClasses[status];
  }
}
