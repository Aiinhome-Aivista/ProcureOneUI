import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../config/api-endpoints';
import { Observable } from 'rxjs';
import { VendorHistoryResponse, VendorRegCount, VendorDetailsResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private http = inject(HttpClient);

  vendorHistory(): Observable<VendorHistoryResponse> {
    return this.http.get<VendorHistoryResponse>(ApiEndpoints.MANAGER.VENDOR_HISTORY);
  }
  vendorRegCount(): Observable<VendorRegCount> {
    return this.http.get<VendorRegCount>(ApiEndpoints.MANAGER.VENDOR_REG_COUNT);
  }

  getVendorDetails(): Observable<VendorDetailsResponse> {
    const vendorId = sessionStorage.getItem('vendorId');
    const url = vendorId
      ? `${ApiEndpoints.MANAGER.VENDOR_DETAILS}?vendor_id=${vendorId}`
      : ApiEndpoints.MANAGER.VENDOR_DETAILS;
    return this.http.get<VendorDetailsResponse>(url);
  }

}
