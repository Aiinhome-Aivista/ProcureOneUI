import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface BiddingHistoryItem {
  id: string;
  vendorName: string;
  category: string;
  submissionDate: string;
  riskScore: 'Low' | 'Medium' | 'High';
  progress: number;
  assignedTo: string;
}

@Component({
  selector: 'app-biding-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './biding-history.html',
  styleUrl: './biding-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidingHistory {
  // --- State Signals ---
  readonly vendorNameFilter = signal('');
  readonly submissionDateFilter = signal('');
  readonly riskScoreFilter = signal('');
  readonly statusFilter = signal('');
  readonly assignedToFilter = signal('');

  private readonly biddingHistory = signal<BiddingHistoryItem[]>([
    { 
      id: '1',
      vendorName: 'Innovatech Solutions Ltd.', 
      category: 'Office Supplies', 
      submissionDate: '26-10-2025', 
      riskScore: 'Low',
      progress: 65,
      assignedTo: 'Compliance Team'
    },
    { 
      id: '2',
      vendorName: 'Quantum Supplies', 
      category: 'Office Supplies', 
      submissionDate: '20-10-2025', 
      riskScore: 'High',
      progress: 80,
      assignedTo: 'Procurement'
    },
    { 
      id: '3',
      vendorName: 'Global Logistics Inc.', 
      category: 'Office Supplies', 
      submissionDate: '24-10-2025', 
      riskScore: 'Medium',
      progress: 45,
      assignedTo: 'Compliance Team'
    },
    { 
      id: '4',
      vendorName: 'Starlight Tech', 
      category: 'Office Supplies', 
      submissionDate: '12-11-2025', 
      riskScore: 'Low',
      progress: 10,
      assignedTo: 'Compliance Team'
    },
  ]);

  // --- Derived State ---
  readonly filteredBiddingHistory = computed(() => {
    const vendorName = this.vendorNameFilter().toLowerCase();
    const submissionDate = this.submissionDateFilter();
    const riskScore = this.riskScoreFilter();
    const status = this.statusFilter();
    const assignedTo = this.assignedToFilter();

    return this.biddingHistory().filter(item => {
      const matchesVendorName = vendorName === '' || item.vendorName.toLowerCase().includes(vendorName);
      const matchesSubmissionDate = submissionDate === '' || item.submissionDate.includes(submissionDate);
      const matchesRiskScore = riskScore === '' || item.riskScore === riskScore;
      const matchesStatus = status === '' || item.riskScore === status;
      const matchesAssignedTo = assignedTo === '' || item.assignedTo === assignedTo;

      return matchesVendorName && matchesSubmissionDate && matchesRiskScore && matchesStatus && matchesAssignedTo;
    });
  });

  // --- Template Helpers ---
  getRiskScoreClass(riskScore: BiddingHistoryItem['riskScore']): string {
    const riskClasses = {
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-orange-100 text-orange-700',
      'High': 'bg-red-100 text-red-700'
    };
    return riskClasses[riskScore];
  }

  getProgressBarClass(riskScore: BiddingHistoryItem['riskScore']): string {
    const progressClasses = {
      'Low': 'bg-[#4319C2]',
      'Medium': 'bg-[#4319C2]',
      'High': 'bg-[#4319C2]'
    };
    return progressClasses[riskScore];
  }
}
