import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../config/api-endpoints';
import { Observable } from 'rxjs';
import { VendorHistoryResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private http = inject(HttpClient);

  vendorHistory(): Observable<VendorHistoryResponse> {
    return this.http.get<VendorHistoryResponse>(ApiEndpoints.MANAGER.VENDOR_HISTORY);
  }

}
