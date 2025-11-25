import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bid-status',
  imports: [],
  templateUrl: './bid-status.html',
  styleUrl: './bid-status.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidStatus {
  readonly summary = {
    title: 'Bid Status',
    intro:
      'Congratulations! Your bid for Requisition #All-REQ-015-2025: Janitorial Supplies has been successfully submitted and recorded in our procurement system.',
    followUp:
      'Your proposal is now under review by the evaluation committee. You will be notified once the assessment process begins or if any clarification is required.',
  } as const;

  readonly details = [
    { label: 'Bid Reference No', value: 'BID-2025-014' },
    { label: 'Category', value: 'Facility Management / Supplies' },
    { label: 'Bid Amount', value: '$245,000.00' },
    { label: 'Submission Date', value: 'October 27, 2025' },
    { label: 'Status', value: 'Under Review' },
  ] as const;

  readonly attachment = {
    name: 'Submitted_Documents.pdf',
    meta: 'PDF · 2.1 MB',
  } as const;

  readonly statusTimeline = [
    {
      label: 'Submitted',
      timestamp: '28 October, 2025 · 17:25',
      state: 'completed' as const,
    },
    {
      label: 'Under Review',
      timestamp: '28 October, 2025 · 17:25',
      state: 'current' as const,
    },
    {
      label: 'Approved',
      timestamp: 'Pending',
      state: 'upcoming' as const,
    },
  ];
}
