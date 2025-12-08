import { Component, signal, computed, ChangeDetectionStrategy, ElementRef, viewChild, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  Chart,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';

Chart.register(...registerables);

interface Vendor {
  id: string;
  name: string;
  subtitle: string;
  amount: number;
  initial: string;
  bgColor: string;
}

@Component({
  selector: 'app-vendor-onboarding',
  imports: [CommonModule],
  templateUrl: './vendor-onboarding.html',
  styleUrl: './vendor-onboarding.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorOnboarding {

  private readonly router = inject(Router);

  private readonly chartRef = viewChild.required<ElementRef<HTMLCanvasElement>>('vendorChart');
  private chart?: Chart<'bar'>;

  // Total vendors
  readonly totalVendors = signal(87);

  // Current requests
  readonly currentRequests = signal(12);

  // Approved vendors count
  readonly approvedVendors = signal(57);

  // Top 5 vendors data
  readonly topVendors = signal<Vendor[]>([
    {
      id: '1',
      name: 'AprexSolution',
      subtitle: 'AprexSolution',
      amount: 145253,
      initial: 'A',
      bgColor: 'bg-primary-600'
    },
    {
      id: '2',
      name: 'TechVendor',
      subtitle: 'TechVendor Inc',
      amount: 128400,
      initial: 'T',
      bgColor: 'bg-primary-600'
    },
    {
      id: '3',
      name: 'GlobalSupply',
      subtitle: 'GlobalSupply Co',
      amount: 115890,
      initial: 'G',
      bgColor: 'bg-primary-600'
    },
    {
      id: '4',
      name: 'QuickService',
      subtitle: 'QuickService Ltd',
      amount: 98750,
      initial: 'Q',
      bgColor: 'bg-primary-600'
    },
    {
      id: '5',
      name: 'ProVendor',
      subtitle: 'ProVendor Group',
      amount: 87320,
      initial: 'P',
      bgColor: 'bg-primary-600'
    }
  ]);

  // Currently active vendor index for carousel
  readonly activeVendorIndex = signal(0);

  // Computed: Requested vendors (total - approved)
  readonly requestedVendors = computed(() =>
    this.totalVendors() - this.approvedVendors()
  );

  // Computed: Approval percentage
  readonly approvalPercentage = computed(() =>
    Math.round((this.approvedVendors() / this.totalVendors()) * 100)
  );


  openManager(): void {
    // Logic to navigate to vendor management page
    console.log('Navigating to Vendor Management Page');
    this.router.navigateByUrl('/department/manager-dashboard');
  }

  // Chart.js data
  readonly chartData: ChartData<'bar'> = {
    labels: ['Approved', 'Requested'],
    datasets: [
      {
        data: [this.approvedVendors(), this.requestedVendors()],
        backgroundColor: ['#4319C2', '#D1D5DB'],
        borderRadius: 8,
        barThickness: 30,
        categoryPercentage: 0.35,
        barPercentage: 1.0
      },
    ],
  };

  readonly chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  constructor() {
    effect(() => {
      const ctx = this.chartRef().nativeElement.getContext('2d');
      if (!ctx) return;

      if (this.chart) {
        this.chart.data.datasets[0].data = [this.approvedVendors(), this.requestedVendors()];
        this.chart.update();
      } else {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Approved', 'Requested'],
            datasets: [
              {
                data: [this.approvedVendors(), this.requestedVendors()],
                backgroundColor: ['#4319C2', '#D1D5DB'],
                borderRadius: 8,
                barThickness: 40,
              },
            ],
          },
          options: this.chartOptions,
        });
      }
    });
  }

  // Format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Navigate carousel
  nextVendor(): void {
    const currentIndex = this.activeVendorIndex();
    const nextIndex = (currentIndex + 1) % this.topVendors().length;
    this.activeVendorIndex.set(nextIndex);
  }

  prevVendor(): void {
    const currentIndex = this.activeVendorIndex();
    const prevIndex = currentIndex === 0
      ? this.topVendors().length - 1
      : currentIndex - 1;
    this.activeVendorIndex.set(prevIndex);
  }

  goToVendor(index: number): void {
    this.activeVendorIndex.set(index);
  }
}
