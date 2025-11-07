import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  computed,
  Signal,
  viewChild,
  effect,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  Chart,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-biding-performance-graph',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './biding-performance-graph.html',
  styleUrl: './biding-performance-graph.css',
})
export class BidingPerformanceGraph {
  private readonly chartRef = viewChild.required<ElementRef<HTMLCanvasElement>>('biddingChart');

  private chart?: Chart<'line'>;

  // Reactive data
  readonly totalValue = signal(256000);
  readonly timeLabels = signal(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']);
  readonly bidValues = signal([12000, 15400, 9000, 2500, 9800, 13500]);

  readonly chartData: Signal<ChartData<'line'>> = computed(() => ({
    labels: this.timeLabels(),
    datasets: [
      {
        label: 'Bidding Performance',
        data: this.bidValues(),
        fill: true,
        borderColor: '#4319C2',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#EDE7F6';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(67,25,194,0.15)');
          gradient.addColorStop(1, 'rgba(67,25,194,0.02)');
          return gradient;
        },
        tension: 0.5, // smooth curve
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#4319C2',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4319C2',
        pointHoverBorderColor: '#FFF',
        pointHoverBorderWidth: 2,
      },
    ],
  }));

  readonly chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#000000CC', font: { size: 11 } },
      },
      y: {
        display: false,
        grid: { display: false },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        usePointStyle: true,
        displayColors: false,
        backgroundColor: '#EDE7F6',
        titleColor: '#000',
        titleFont: { size: 12, weight: 'bold' },
        bodyColor: '#000',
        bodyFont: { size: 12 },
        callbacks: {
          title: () => '',
          label: (ctx) => `$${ctx.formattedValue} Average`,
        },
      },
    },
    elements: {
      line: { borderWidth: 2 },
    },
  };

  constructor() {
    effect(() => {
      const chartData = this.chartData(); // Depend on chartData signal
      const ctx = this.chartRef().nativeElement.getContext('2d');
      if (!ctx) return;

      if (this.chart) {
        // If chart exists, update its data and refresh
        this.chart.data = chartData;
        this.chart.update();
      } else {
        // Otherwise, create a new chart
        this.chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: this.chartOptions,
        });
      }
    });
  }
}
