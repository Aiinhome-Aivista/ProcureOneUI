import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { LegalProofResponse } from '../models';
import { DropdownModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // jobSubscribe = new Subject();

  constructor(private http: HttpClient) { }


  businessTypes(): Observable<DropdownModel>{
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.BUSINESS_TYPES);
  }

  industryCategories(): Observable<DropdownModel> {
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.INDUSTRY_CATEGORIES);
  }

  designations(): Observable<DropdownModel> {
    return this.http.get<DropdownModel>(ApiEndpoints.AUTH.DESIGNATIONS);
  }

  certificateIncorporation(): Observable<LegalProofResponse> {
    return this.http.get<LegalProofResponse>(ApiEndpoints.AUTH.CERTIFICATE_iNCORPORATION)
  }

  
}
