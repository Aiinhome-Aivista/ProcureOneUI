
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-requisition-bidding-viewpage',
  imports: [],
  templateUrl: './requisition-bidding-viewpage.html',
  styleUrl: './requisition-bidding-viewpage.css',
})
export class RequisitionBiddingViewpage {

   requisitions = [
    { id: 'REQ-001', title: 'Office Supplies', vendor: 'ABC Traders', status: 'Approved', date: '2025-11-09' },
    { id: 'REQ-002', title: 'Laptop Purchase', vendor: 'TechMart', status: 'Pending', date: '2025-11-08' },
    { id: 'REQ-003', title: 'Furniture', vendor: 'HomeLine', status: 'Rejected', date: '2025-11-07' },
  ];
}



