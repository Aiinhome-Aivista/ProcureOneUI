import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step4-capability',
  imports: [CommonModule],
  templateUrl: './step4-capability.component.html',
  styleUrls: ['./step4-capability.component.css']
})
export class Step4CapabilityComponent {
  data = input<any>({});
  dataChange = output<any>();
}
