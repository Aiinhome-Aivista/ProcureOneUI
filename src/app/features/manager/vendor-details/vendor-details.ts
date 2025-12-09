import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Document {
  id: number;
  name: string;
  icon: string;
}

interface VendorInfo {
  companyName: string;
  applicationId: string;
  legalName: string;
  address: string;
  website: string;
  creditScore: string;
  annualRevenue: string;
}

@Component({
  selector: 'app-vendor-details',
  imports: [CommonModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorDetails {
  readonly vendorInfo = signal<VendorInfo>({
    companyName: 'Innovatech Solutions Ltd.',
    applicationId: 'VN-8574582',
    legalName: 'Innovatech Solutions Ltd.',
    address: '123 Tech Park, Silicon Valley',
    website: 'innovatech.com',
    creditScore: '810 (Excellent)',
    annualRevenue: '$50M+'
  });

  readonly documents = signal<Document[]>([
    { id: 1, name: 'Details_Network_Diagram.pdf', icon: 'description' },
    { id: 2, name: 'Details_Network_Diagram.pdf', icon: 'description' },
    { id: 3, name: 'Details_Network_Diagram.pdf', icon: 'description' },
    { id: 4, name: 'Details_Network_Diagram.pdf', icon: 'description' },
    { id: 5, name: 'Details_Network_Diagram.pdf', icon: 'description' }
  ]);

  downloadDocument(doc: Document): void {
    console.log('Downloading:', doc.name);
  }
}
