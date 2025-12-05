import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCard } from "../../vendor/dashboard/dashboard-child/top-card/top-card";
import { BidingHistory } from "../../vendor/dashboard/dashboard-child/biding-history/biding-history";

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule, TopCard, BidingHistory],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css'
})
export class ManagerDashboardComponent {

}
