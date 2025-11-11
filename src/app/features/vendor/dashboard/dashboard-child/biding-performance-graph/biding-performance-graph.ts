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
  private readonly chartRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('biddingChart');

  private chart?: Chart<'line'>;

  //  Period selection (dropdown value)
  readonly selectedPeriod = signal<'quarterly' | 'halfyear' | 'yearly'>('quarterly');

  //  Hardcoded JSON data (requested)
  readonly dataSource = {
    quarterly: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [12000, 15400, 9000, 13500],
      total: 256000,
    },
    halfyear: {
      labels: ['H1', 'H2', 'H3', 'H4'],
      values: [18000, 26000, 15000, 20000],
      total: 79000,
    },
    yearly: {
      labels: ['2021', '2022', '2023', '2024'],
      values: [95000, 89000, 102000, 120000],
      total: 406000,
    },
  };

  // Reactive signals based on dropdown
  readonly timeLabels = computed(() => this.dataSource[this.selectedPeriod()].labels);
  readonly bidValues = computed(() => this.dataSource[this.selectedPeriod()].values);
  readonly totalValue = computed(() => this.dataSource[this.selectedPeriod()].total);

  // ChartJS dataset
  readonly chartData: Signal<ChartData<'line'>> = computed(() => ({
    labels: this.timeLabels(),
    datasets: [
      {
        label: 'Bidding Performance',
        data: this.bidValues(),
        fill: true,
        borderColor: '#4319C2',
        tension: 0.5,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#EDE7F6';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(67,25,194,0.15)');
          gradient.addColorStop(1, 'rgba(67,25,194,0.02)');
          return gradient;
        },
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#4319C2',
        pointBorderWidth: 3,
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
    plugins: {
      legend: { display: false },
      tooltip: {
        usePointStyle: true,
        displayColors: false,
        backgroundColor: '#EDE7F6',
        titleColor: '#000',
        bodyColor: '#000',
        callbacks: {
          title: () => '',
          label: (ctx) => `$${ctx.formattedValue} Average`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { display: false },
    },
  };

  constructor() {
    effect(() => {
      const ctx = this.chartRef().nativeElement.getContext('2d');
      if (!ctx) return;

      if (this.chart) {
        this.chart.data = this.chartData();
        this.chart.update();
      } else {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.chartData(),
          options: this.chartOptions,
        });
      }
    });
  }

  //  Called when dropdown changes
  handlePeriodChange(event: Event) {
    const newValue = (event.target as HTMLSelectElement).value as
      | 'quarterly'
      | 'halfyear'
      | 'yearly';

    this.selectedPeriod.set(newValue);
  }
}
