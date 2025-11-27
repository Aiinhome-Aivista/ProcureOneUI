import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { BasicInfo, BasicInfoResponse, BusinessTaxInfo, BusinessTaxResponse, DropdownModel, VendorInfoResponse } from '../models';
import { LegalProofResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // jobSubscribe = new Subject();

  constructor(private http: HttpClient) { }


  businessTypes(): Observable<DropdownModel> {
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.BUSINESS_TYPES);
  }

  industryCategories(): Observable<DropdownModel> {
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.INDUSTRY_CATEGORIES);
  }

  designations(): Observable<DropdownModel> {
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.DESIGNATIONS);
  }

  countries(): Observable<DropdownModel> {
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.COUNTRIES);
  }

  certificateIncorporation(): Observable<LegalProofResponse> {
    return this.http.get<LegalProofResponse>(ApiEndpoints.AUTH.CERTIFICATE_iNCORPORATION)
  }

  getBasicInfo(): Observable<VendorInfoResponse> {
    const vendorId = sessionStorage.getItem('vendorId');
    const url = vendorId
      ? `${ApiEndpoints.AUTH.GET_BASIC_INFO}?vendor_id=${vendorId}`
      : ApiEndpoints.AUTH.GET_BASIC_INFO;
    return this.http.get<VendorInfoResponse>(url);
  }





  states(body: any): Observable<DropdownModel> {
    return this.http.post<DropdownModel>(ApiEndpoints.AUTH.STATES, body);
  }

  cities(body: any): Observable<DropdownModel> {
    return this.http.post<DropdownModel>(ApiEndpoints.AUTH.CITIES, body);
  }

  postBasicInfo(body: BasicInfo): Observable<BasicInfoResponse> {
    return this.http.post<BasicInfoResponse>(ApiEndpoints.AUTH.BASIC_INFO, body);
  }

  postBusinessTax(formData: FormData): Observable<BusinessTaxResponse> {
    return this.http.post<BusinessTaxResponse>(ApiEndpoints.AUTH.POST_BUSINESS_TAX_DOC, formData);
  }

}
