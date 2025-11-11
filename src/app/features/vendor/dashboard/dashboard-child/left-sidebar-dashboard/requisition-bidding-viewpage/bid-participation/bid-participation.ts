import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BidSubmissionModal } from '../../../../../../../modal/components/bid-submission-modal/bid-submission-modal';


@Component({
  selector: 'app-bid-participation',
  imports: [CommonModule, FormsModule, BidSubmissionModal],
  templateUrl: './bid-participation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidParticipation{
  bidAmount = signal<number | null>(null);
  deliveryTime = signal<number | null>(null);
  agreeToTerms = signal(false);
  selectedFile = signal<File | null>(null);
  isDragging = signal(false);
  isModalVisible = signal(false);

  isFormValid = computed(() => {
    return this.bidAmount() && this.deliveryTime() && this.agreeToTerms() && this.selectedFile();
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  removeFile(): void {
    this.selectedFile.set(null);
  }

  handleBidSubmission() {
    console.log('Bid submitted');
    this.isModalVisible.set(false);
    // Reset form if needed
  }
}
