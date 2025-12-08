import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalButtonComponent } from "../../../shared/components/global-button/global-button.component";

interface HeatMapCell {
  value: number;
  label: string;
}

@Component({
  selector: 'app-hit-map-leftside',
  imports: [GlobalButtonComponent, CommonModule],
  templateUrl: './hit-map-leftside.html',
  styleUrl: './hit-map-leftside.css',
})
export class HitMapLeftside {
  // Heat map data - 4 rows x 6 columns
  readonly heatMapData = signal<HeatMapCell[][]>([
    [
      { value: 0.2, label: '0.2' },
      { value: 1.2, label: '1.2' },
      { value: 2.2, label: '2.2' },
      { value: 0.8, label: '0.8' },
      { value: 0.1, label: '0.1' },
      { value: 5.0, label: '5.0' }
    ],
    [
      { value: 0.7, label: '0.7' },
      { value: 1.2, label: '1.2' },
      { value: 0.2, label: '0.2' },
      { value: 0.3, label: '0.3' },
      { value: 1.3, label: '1.3' },
      { value: 0.1, label: '0.1' }
    ],
    [
      { value: 1.2, label: '1.2' },
      { value: 3.0, label: '3.0' },
      { value: 3.2, label: '3.2' },
      { value: 0.5, label: '0.5' },
      { value: 0.2, label: '0.2' },
      { value: 1.0, label: '1.0' }
    ],
    [
      { value: 0.2, label: '0.2' },
      { value: 1.2, label: '1.2' },
      { value: 2.2, label: '2.2' },
      { value: 0.8, label: '0.8' },
      { value: 0.1, label: '0.1' },
      { value: 5.0, label: '5.0' }
    ]
  ]);

  // Get the max value for color intensity calculation
  readonly maxValue = computed(() => {
    return Math.max(...this.heatMapData().flat().map(cell => cell.value));
  });

  // Calculate color intensity based on value (using primary color palette)
  getColorClass(value: number): string {
    const intensity = value / this.maxValue();
    
    if (intensity === 0) return 'bg-gray-50';
    if (intensity < 0.2) return 'bg-primary-100';
    if (intensity < 0.4) return 'bg-primary-200';
    if (intensity < 0.6) return 'bg-primary-300';
    if (intensity < 0.8) return 'bg-primary-400';
    return 'bg-primary-500';
  }

  // Get text color based on intensity
  getTextColor(value: number): string {
    const intensity = value / this.maxValue();
    return intensity >= 0.6 ? 'text-white' : 'text-gray-900';
  }
}
