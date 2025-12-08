import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-steps',
  imports: [CommonModule],
  templateUrl: './preview-steps.html',
  styleUrl: './preview-steps.css',
})
export class PreviewSteps {
  @Input() summary: any;
}
