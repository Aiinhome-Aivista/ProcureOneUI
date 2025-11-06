import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { DropdownCityModel, DropdownCountryModel, DropdownModel, DropdownStateModel } from '../models';
import { LegalProofResponse } from '../models';

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

  countries(): Observable<DropdownCountryModel> {
    return this.http.get<DropdownCountryModel>(ApiEndpoints.AUTH.COUNTRIES);
  }

  states(body: any): Observable<DropdownStateModel> {
    return this.http.post<DropdownStateModel>(ApiEndpoints.AUTH.STATES, body);
  }

  cities(body: any): Observable<DropdownCityModel> {
    return this.http.post<DropdownCityModel>(ApiEndpoints.AUTH.CITIES, body);
  }
  
  certificateIncorporation(): Observable<LegalProofResponse> {
    return this.http.get<LegalProofResponse>(ApiEndpoints.AUTH.CERTIFICATE_iNCORPORATION)
  }

  
}
