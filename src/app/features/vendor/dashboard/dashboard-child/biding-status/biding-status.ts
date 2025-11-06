import { Component,OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-biding-status',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './biding-status.html',
  styleUrl: './biding-status.css',
})
export class BidingStatus implements OnInit {
    data!: ChartData<'doughnut'>;
  options!: ChartOptions<'doughnut'>;
  approvedCount = 7;
  totalCount = 35;

  ngOnInit(): void {
    const approved = this.approvedCount;
    const requested = this.totalCount - approved;

    this.data = {
      labels: ['Requested Bid', 'Approved Bid'],
      datasets: [
        {
          data: [requested, approved],
          backgroundColor: ['#D9D9D9', '#4B1DB1'],
          hoverBackgroundColor: ['#D9D9D9', '#4B1DB1'],
          borderWidth: 0,
         
          borderRadius: 50,
          spacing: 3
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      animation: {
        animateRotate: true,
        duration: 1200
      }
    };
  }
}