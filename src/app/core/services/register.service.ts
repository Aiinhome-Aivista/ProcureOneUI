import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { BasicInfo, DropdownModel } from '../models';
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





  states(body: any): Observable<DropdownModel> {
    return this.http.post<DropdownModel>(ApiEndpoints.AUTH.STATES, body);
  }

  cities(body: any): Observable<DropdownModel> {
    return this.http.post<DropdownModel>(ApiEndpoints.AUTH.CITIES, body);
  }

  postBasicInfo(body: any): Observable<BasicInfo> {
    return this.http.post<BasicInfo>(ApiEndpoints.AUTH.BASIC_INFO, body);
  }

}
