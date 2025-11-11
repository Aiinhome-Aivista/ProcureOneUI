import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisitionBiddingViewpage } from "../requisition-bidding-viewpage/requisition-bidding-viewpage";

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule, RequisitionBiddingViewpage],
  templateUrl: './left-sidebar.html',
  styleUrls: ['./left-sidebar.css'],
})
export class LeftSidebar {
  @Output() cardClicked = new EventEmitter<void>();
  selectedCard: number | null = null;

  bidCards = [
    { id: 'AII-REQ-015-2025', title: 'IT Equipment', date: '28th October 2025' },
    { id: 'AII-REQ-016-2025', title: 'Resource Required', date: '30th October 2025' },
    { id: 'AII-REQ-017-2025', title: 'Android Developer', date: '1st November 2025' },
  ];
  // selectCard(index: number) {
  //   this.selectedCard = index;
  // }

  selectCard(index: number) {
    console.log('card clicked', index);
    this.selectedCard = index;
    this.cardClicked.emit();
  }

  // Called from the button to avoid click propagation issues
  openByButton(event: Event, index: number) {
    event.stopPropagation(); // prevents parent div click if needed
    console.log('button clicked', index);
    this.selectedCard = index;
  }
}