import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step5-approved',
  imports: [CommonModule],
  templateUrl: './step5-approved.component.html',
  styleUrls: ['./step5-approved.component.css']
})
export class Step5ApprovedComponent {
  data = input<any>({});
  dataChange = output<any>();
  termsAccepted = input<boolean>(false);
  
  onTermsChange(event: any): void {
    this.dataChange.emit({ termsAccepted: event.target.checked });
  }
}
