import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { DropdownModel } from '../models';

// import { Router } from '@angular/router';
// import { POSTurl } from '../../config';


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

  
}
