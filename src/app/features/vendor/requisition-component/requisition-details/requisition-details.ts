import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-requisition-details',
  imports: [],
  templateUrl: './requisition-details.html',
  styleUrl: './requisition-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitionDetails {
  readonly activeTab = signal<'details' | 'terms'>('details');

  readonly lineItems = [
    {
      item: 'Dell PowerEdge R760 Servers',
      quantity: '10',
      specification: 'Dual Intel Xeon Gold, 512GB RAM, 20TB NVMe SSD',
    },
    {
      item: 'Cisco Catalyst 9300 Switches',
      quantity: '25',
      specification: '48-port PoE+, 10G uplinks, redundant power',
    },
    {
      item: 'Enterprise CRM Software License',
      quantity: '500',
      specification: '5-year term, includes support & maintenance',
    },
  ] as const;

  readonly attachments = [
    { name: 'Details_Network_Diagram.pdf', meta: 'PDF · 1.2 MB' },
    { name: 'Security_Compliance_Requirements.docx', meta: 'DOCX · 840 KB' },
  ] as const;

  readonly terms = [
    {
      title: 'Submission Compliance',
      body: 'All deliverables must adhere to corporate cybersecurity, ESG, and data sovereignty mandates.',
    },
    {
      title: 'Milestone Reviews',
      body: 'Quarterly reviews with procurement and security leads are required prior to release of staged payments.',
    },
    {
      title: 'Change Management',
      body: 'Scope adjustments demand written approval and a refreshed implementation schedule agreed by both parties.',
    },
    {
      title: 'Confidentiality',
      body: 'No project artifact may be shared externally without consent; breach can result in immediate termination.',
    },
  ] as const;

  selectTab(tab: 'details' | 'terms'): void {
    this.activeTab.set(tab);
  }
}
