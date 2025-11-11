import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requisition-details',
  imports: [CommonModule],
  templateUrl: './requisition-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitionDetails{
  activeTab = signal<'details' | 'terms'>('details');
}
