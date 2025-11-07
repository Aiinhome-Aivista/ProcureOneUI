import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-biding-status',
  standalone: true,
  imports: [],
  templateUrl: './biding-status.html',
  styleUrl: './biding-status.css',
})
export class BidingStatus implements AfterViewInit {
   @ViewChild('donutChart', { static: true })
  private readonly donutChartRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart<'doughnut'> | null = null;

  // Reactive data
  readonly totalBids = signal(35);
  readonly approvedBids = signal(7);

  readonly chartData: Signal<ChartData<'doughnut'>> = computed(() => {
    const approved = this.approvedBids();
    const total = this.totalBids();
    const remaining = total - approved;

    return {
      labels: ['Requested Bid', 'Approved Bid'],
      datasets: [
        {
          data: [remaining, approved],
          backgroundColor: ['#D9D9D9', '#4319C2'],
          borderWidth: 0,
          cutout: '75%',
          hoverOffset: 6,
        },
      ],
    };
  });

  readonly chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  ngAfterViewInit(): void {
    const ctx = this.donutChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: this.chartData(),
      options: this.chartOptions,
    };

    this.chart = new Chart(ctx, config);
  }

}