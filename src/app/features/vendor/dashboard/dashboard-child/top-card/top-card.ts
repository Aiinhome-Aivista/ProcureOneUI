import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCardData, dashboardData } from '../../../../../data/data';

@Component({
  selector: 'app-top-card',
  imports: [CommonModule],
  templateUrl: './top-card.html',
  styleUrl: './top-card.css',
  standalone: true
})
export class TopCard {
  topCards: TopCardData[] = dashboardData.topCards;
}
