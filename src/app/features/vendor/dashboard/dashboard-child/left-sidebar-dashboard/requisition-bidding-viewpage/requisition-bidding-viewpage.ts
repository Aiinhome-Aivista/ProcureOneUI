import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidSubmissionModal } from '../../../../../../modal/components/bid-submission-modal/bid-submission-modal';

import { RequisitionHeader } from "./requisition-header/requisition-header";
import { RequisitionDetails } from "./requisition-details/requisition-details";
import { BidParticipation } from "./bid-participation/bid-participation";

@Component({
  selector: 'app-requisition-bidding-viewpage',
  imports: [CommonModule, BidSubmissionModal, FormsModule, RequisitionHeader, RequisitionDetails, BidParticipation],
  templateUrl: './requisition-bidding-viewpage.html',
  styleUrls: ['./requisition-bidding-viewpage.css'],
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
  @Output() backClicked = new EventEmitter<void>();
  

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

