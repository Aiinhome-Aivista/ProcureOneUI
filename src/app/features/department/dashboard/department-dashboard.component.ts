import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../../core/services/auth.service';
import { AuthService } from '../../../core/services/auth.service';
import { TopCard } from "../../vendor/dashboard/dashboard-child/top-card/top-card";
import { BidingStatus } from "../../vendor/dashboard/dashboard-child/biding-status/biding-status";
import { BidingPerformanceGraph } from "../../vendor/dashboard/dashboard-child/biding-performance-graph/biding-performance-graph";
@Component({
  selector: 'app-department-dashboard',
  imports: [CommonModule, TopCard, BidingStatus, BidingPerformanceGraph],
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})
export class DepartmentDashboardComponent  {



}
