import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-bid-participation',
  imports: [],
  templateUrl: './bid-participation.html',
  styleUrl: './bid-participation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidParticipation {
  readonly bidAmount = signal('');
  readonly deliveryTime = signal('');
  readonly acceptedTerms = signal(false);
  readonly selectedFile = signal<File | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  onSubmit(): void {
    if (!this.acceptedTerms()) {
      return;
    }
    // Handle form submission
    console.log({
      bidAmount: this.bidAmount(),
      deliveryTime: this.deliveryTime(),
      file: this.selectedFile(),
    });
  }
}
