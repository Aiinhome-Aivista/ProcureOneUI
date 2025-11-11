import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requisition-bidding-viewpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requisition-bidding-viewpage.html',
  styleUrls: ['./requisition-bidding-viewpage.css'],
})
export class RequisitionBiddingViewpage {
  @Output() backClicked = new EventEmitter<void>();
  activeTab = 'details';

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}