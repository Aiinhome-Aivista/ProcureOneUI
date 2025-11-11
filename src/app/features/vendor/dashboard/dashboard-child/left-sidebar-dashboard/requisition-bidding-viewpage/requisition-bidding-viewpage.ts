
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidSubmissionModal } from '../../../../../../modal/components/bid-submission-modal/bid-submission-modal';

@Component({
  selector: 'app-requisition-bidding-viewpage',
  standalone: true,
  imports: [CommonModule, BidSubmissionModal, FormsModule],
  templateUrl: './requisition-bidding-viewpage.html',
  styleUrl: './requisition-bidding-viewpage.css',
})
export class RequisitionBiddingViewpage {
  activeTab: 'details' | 'terms' = 'details';
  isModalVisible = false;

  // Form properties
  bidAmount: number | null = null;
  deliveryTime: number | null = null;
  agreeToTerms = false;
  selectedFile: File | null = null;
  isDragging = false;

  requisitions = [
    { id: 'REQ-001', title: 'Office Supplies', vendor: 'ABC Traders', status: 'Approved', date: '2025-11-09' },
    { id: 'REQ-002', title: 'Laptop Purchase', vendor: 'TechMart', status: 'Pending', date: '2025-11-08' },
    { id: 'REQ-003', title: 'Furniture', vendor: 'HomeLine', status: 'Rejected', date: '2025-11-07' },
  ];

  selectTab(tab: 'details' | 'terms') {
    this.activeTab = tab;
  }

  handleBidSubmission(): void {
    // Logic to handle the actual bid submission (e.g., API call)
    console.log('Bid has been confirmed and submitted!');
    this.isModalVisible = false;
  }

  // File handling methods
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  handleFile(file: File): void {
    // Optional: Add validation for file type and size here
    this.selectedFile = file;
  }

  removeFile(): void {
    this.selectedFile = null;
  }

  get isFormValid(): boolean {
    return !!this.bidAmount && !!this.deliveryTime && this.agreeToTerms && !!this.selectedFile;
  }
}
