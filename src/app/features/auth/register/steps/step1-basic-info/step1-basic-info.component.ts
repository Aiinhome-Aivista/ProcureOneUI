
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IdentityDetails } from "../Basic Information/identity-details/identity-details";
import { BusninessRegistrationDocuments } from "../Basic Information/busniness-registration-documents/busniness-registration-documents";
import { Component, output, input } from '@angular/core';
import { FinancialPerformaceDocuments } from "../Basic Information/financial-performace-documents/financial-performace-documents";
import { BankFinancialDetails } from "../Basic Information/bank-financial-details/bank-financial-details";

@Component({
  selector: 'app-company-details',
  templateUrl: './step1-basic-info.component.html',
  styleUrls: ['./step1-basic-info.component.css'],
  imports: [ReactiveFormsModule, CommonModule, IdentityDetails, BusninessRegistrationDocuments, FinancialPerformaceDocuments, BankFinancialDetails],
  host: {
    'role': 'main'
  }
})
export class CompanyDetailsComponent{
   data = input<any>({});
  dataChange = output<any>();
  
  onFileChange(field: string, event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.dataChange.emit({ [field]: file });
    }
  }
}