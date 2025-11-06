import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { LegalProofResponse } from '../models';

// import { Router } from '@angular/router';
// import { POSTurl } from '../../config';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // jobSubscribe = new Subject();

  constructor(private http: HttpClient) { }


  businessTypes() {
    return this.http.get(ApiEndpoints.AUTH.BUSINESS_TYPES);
  }

  industryCategories() {
    return this.http.get(ApiEndpoints.AUTH.INDUSTRY_CATEGORIES);
  }

  certificateIncorporation() {
    return this.http.get<LegalProofResponse>(ApiEndpoints.AUTH.CERTIFICATE_iNCORPORATION)
  }

  
}
