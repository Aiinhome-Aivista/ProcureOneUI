import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { StepIndicatorComponent } from "../../auth/register/components/step-indicator/step-indicator.component";
import { StatusCurds } from "../status-curds/status-curds";
import { VendorDetails } from "../vendor-details/vendor-details";
import { AiReview } from "../ai-review/ai-review";
import { GmReview } from "../gm-review/gm-review";

@Component({
  selector: 'app-vendor-reg-review',
  imports: [StepIndicatorComponent, StatusCurds, VendorDetails, AiReview, GmReview],
  templateUrl: './vendor-reg-review.html',
  styleUrl: './vendor-reg-review.css',
})
export class VendorRegReview implements OnInit {
  private readonly route = inject(ActivatedRoute);
  vendorId: string | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vendorId = params['vendorId'];
      console.log('Vendor ID from params:', this.vendorId);
    });
  }
}
