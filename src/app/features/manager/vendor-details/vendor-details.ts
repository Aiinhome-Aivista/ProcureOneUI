import { Component, signal, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../core/services';

interface Document {
  id: number;
  name: string;
  icon: string;
  url: string;
}

interface VendorInfo {
  companyName: string;
  applicationId: string;
  legalName: string;
  address: string;
  gstNumber: string;
  panNumber: string;
  registrationNumber: string;
  msmeNumber: string;
}

@Component({
  selector: 'app-vendor-details',
  imports: [CommonModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly departmentService = inject(DepartmentService);
  readonly vendorInfo = signal<VendorInfo>({
    companyName: '',
    applicationId: '',
    legalName: '',
    address: '',
    gstNumber: '',
    panNumber: '',
    registrationNumber: '',
    msmeNumber: ''
  });

  readonly documents = signal<Document[]>([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const vendorId = params['vendorId'];
      if (vendorId) {
        sessionStorage.setItem('vendorId', vendorId);
        this.getVendorDetails();
      }
    });
  }

  getVendorDetails(): void {
    this.departmentService.getVendorDetails().subscribe({
      next: (response) => {
        if (response.isSuccess && response.data) {
          const data = response.data;
          
          // Update vendor info
          this.vendorInfo.set({
            companyName: data.company_name,
            applicationId: data.vendor_id,
            legalName: data.company_name,
            address: data.Address,
            gstNumber: data.gst_vat_number,
            panNumber: data.pan_number,
            registrationNumber: data.registration_number,
            msmeNumber: data.msme_udyam_number
          });

          // Map documents
          const docs: Document[] = [];
          if (data.audited_balance_sheet_doc_url) {
            docs.push({
              id: 1,
              name: 'Audited Balance Sheet',
              icon: 'description',
              url: data.audited_balance_sheet_doc_url
            });
          }
          if (data.bank_statement_doc_url) {
            docs.push({
              id: 2,
              name: 'Bank Statement',
              icon: 'description',
              url: data.bank_statement_doc_url
            });
          }
          if (data.bank_verification_letter_doc_url) {
            docs.push({
              id: 3,
              name: 'Bank Verification Letter',
              icon: 'description',
              url: data.bank_verification_letter_doc_url
            });
          }
          if (data.cancelled_cheque_doc_url) {
            docs.push({
              id: 4,
              name: 'Cancelled Cheque',
              icon: 'description',
              url: data.cancelled_cheque_doc_url
            });
          }
          if (data.income_tax_return_doc_url) {
            docs.push({
              id: 5,
              name: 'Income Tax Return',
              icon: 'description',
              url: data.income_tax_return_doc_url
            });
          }
          if (data.profit_loss_statement_doc_url) {
            docs.push({
              id: 6,
              name: 'Profit & Loss Statement',
              icon: 'description',
              url: data.profit_loss_statement_doc_url
            });
          }
          if (data.turnover_declaration_doc_url) {
            docs.push({
              id: 7,
              name: 'Turnover Declaration',
              icon: 'description',
              url: data.turnover_declaration_doc_url
            });
          }

          this.documents.set(docs);
        }
      },
      error: (err) => {
        console.error('Error fetching vendor details:', err);
      }
    });
  }

  downloadDocument(doc: Document): void {
    console.log('Downloading:', doc.name);
    // Implement actual download logic here
    // window.open(doc.url, '_blank');
  }
}