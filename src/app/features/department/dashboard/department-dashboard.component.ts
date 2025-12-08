import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../../core/services/auth.service';
import { AuthService } from '../../../core/services/auth.service';
import { TopCard } from "../../vendor/dashboard/dashboard-child/top-card/top-card";
import { BidingStatus } from "../../vendor/dashboard/dashboard-child/biding-status/biding-status";
import { BidingPerformanceGraph } from "../../vendor/dashboard/dashboard-child/biding-performance-graph/biding-performance-graph";
import { HitMapLeftside } from "../hit-map-leftside/hit-map-leftside";
import { VendorOnboarding } from "../vendor-onboarding/vendor-onboarding";
@Component({
  selector: 'app-department-dashboard',
  imports: [CommonModule, TopCard, BidingStatus, BidingPerformanceGraph, HitMapLeftside, VendorOnboarding],
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})
export class DepartmentDashboardComponent  {



}
