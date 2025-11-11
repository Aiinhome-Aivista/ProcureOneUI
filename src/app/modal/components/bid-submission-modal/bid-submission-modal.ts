import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bid-submission-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bid-submission-modal.html',
  styleUrl: './bid-submission-modal.css',
})
export class BidSubmissionModal {
  @Input() isVisible: boolean = false;
  @Input() requisitionId: string = 'All-REQ-015-2025';
  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  close(): void {
    this.onCancel.emit();
  }

  confirm(): void {
    this.onConfirm.emit();
  }
}
