import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


interface NavItem {
  title: string;
  description: string;
}
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})


export class Sidebar {
  currentStep = input<number>(1);

 

 readonly navItems = signal<NavItem[]>([
    {
      title: 'Identity Details',
      description:
        'This section verifies the vendor’s identity, registration, ownership, and communication details — legally required before financial or risk verification.',
    },
    {
      title: 'Basic Business & Tax Registration Documents',
      description:
        'This section is the foundation of vendor legal verification. It ensures the company is legally registered, authorized to operate, and eligible for taxation and procurement contracts.',
    },
    {
      title: 'Bank & Financial Identity Verification',
      description:
        'Used to confirm ownership, transaction capability, and financial soundness.',
    },
    {
      title: 'Financial Performance Documents',
      description:
        'Used to assess solvency, working capital, and risk factor.',
    },
  ]);
  public selectedIndex = signal<number>(0);


  public select(index: number): void {
    this.selectedIndex.set(index);
  }


}
