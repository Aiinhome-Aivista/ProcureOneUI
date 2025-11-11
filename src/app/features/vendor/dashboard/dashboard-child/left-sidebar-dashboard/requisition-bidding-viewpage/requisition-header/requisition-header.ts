import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requisition-header',
  imports: [CommonModule],
  templateUrl: './requisition-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitionHeader{
  backClicked = output<void>();

  // In a real app, these would likely be inputs
  requisitionTitle = 'IT Equipment';
  requisitionId = 'All-REQ-015-2025';
}
