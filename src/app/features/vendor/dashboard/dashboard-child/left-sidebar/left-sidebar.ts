import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-sidebar.html',
  styleUrls: ['./left-sidebar.css'],
})
export class LeftSidebar {
  selectedCard: number | null = null;
  bidCards = [
    { id: 'AII-REQ-015-2025', title: 'IT Equipment', date: '28th October 2025' },
    { id: 'AII-REQ-016-2025', title: 'Resource Required', date: '30th October 2025' },
    { id: 'AII-REQ-017-2025', title: 'Android Developer', date: '1st November 2025' },
  ];
  selectCard(index: number) {
    this.selectedCard = index;
  }
}