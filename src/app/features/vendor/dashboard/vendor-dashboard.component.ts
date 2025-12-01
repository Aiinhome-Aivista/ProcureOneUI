import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LeftSidebar } from "./dashboard-child/left-sidebar/left-sidebar";
import { TopCard } from "./dashboard-child/top-card/top-card";
import { BidingPerformanceGraph } from "./dashboard-child/biding-performance-graph/biding-performance-graph";
import { BidingStatus } from "./dashboard-child/biding-status/biding-status";
import { BidingHistory } from "./dashboard-child/biding-history/biding-history";
import { ItEquipment } from "../requisition-component/it-equipment/it-equipment";
import { RequisitionDetails } from "../requisition-component/requisition-details/requisition-details";
import { BidStatus } from "../requisition-component/bid-status/bid-status";

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-vendor-dashboard',
  imports: [CommonModule, LeftSidebar, TopCard, BidingPerformanceGraph, BidingStatus, BidingHistory, ItEquipment, RequisitionDetails, BidStatus],
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent {

  public isRequestionVisible : boolean = false;
 
}
