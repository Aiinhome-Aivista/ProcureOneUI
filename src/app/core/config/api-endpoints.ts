import { environment } from '../../../environments/environment';

/**
 * API Endpoints Configuration
 * Centralized location for all API endpoints
 */
export class ApiEndpoints {
  private static readonly BASE_URL = environment.apiUrl;

  // Authentication endpoints
  static readonly AUTH = {
    LOGIN: `${ApiEndpoints.BASE_URL}/AuthMicroservices/login`,

    REFRESH_TOKEN: `${ApiEndpoints.BASE_URL}/AuthMicroservices/refresh-token`,
    BUSINESS_TYPES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/business_types`,
    INDUSTRY_CATEGORIES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/industry_categories`,
    DESIGNATIONS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/designations`,
    COUNTRIES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/countries`,
    STATES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/states`,
    CITIES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/cities`,
    CERTIFICATE_iNCORPORATION: `${ApiEndpoints.BASE_URL}/VendorMicroservices/legal_proofs`,
    BASIC_INFO: `${ApiEndpoints.BASE_URL}/VendorMicroservices/basic-info`,
    GET_BASIC_INFO: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-basic-info`,
    POST_BUSINESS_TAX_DOC: `${ApiEndpoints.BASE_URL}/VendorMicroservices/registration-tax-docs`,
    GET_BUSINESS_TAX_DOCS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-registration-tax-docs`,
    POST_BANK_DETAILS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/bank-verification`,
    GET_BANK_DETAILS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-bank-verification`,
    SEND_VENDOR_OTP: `${ApiEndpoints.BASE_URL}/VendorMicroservices/send-otp`,
    VERIFY_VENDOR_OTP: `${ApiEndpoints.BASE_URL}/VendorMicroservices/verify-otp`,
    GET_VENDOR_REGISTRATION_TRACKER: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-registration-tracker`,
    POST_FINANCIAL_DOCS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/financial-docs`,
    GET_FINANCIAL_DOCS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-financial-performance`,
    GET_VENDOR_REGISTRATION_DETAILS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-registration-details`,
    SUBMIT_REGISTRATION: `${ApiEndpoints.BASE_URL}/VendorMicroservices/submit-registration`,
    GET_VENDOR_REGISTRATION_FULL_DATA: `${ApiEndpoints.BASE_URL}/VendorMicroservices/vendor-registration-full-data`,
    GET_VENDOR_PROGRESS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-progress`,
  } as const;


  // MANAGER endpoints
  static readonly MANAGER = {
    VENDOR_HISTORY: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-history`,
    VENDOR_REG_COUNT: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-registration-count`,
    VENDOR_DETAILS: `${ApiEndpoints.BASE_URL}/VendorMicroservices/get-vendor-details`,

  } as const;



  // Vendor endpoints
  static readonly VENDOR = {
    DASHBOARD: `${ApiEndpoints.BASE_URL}/vendor/dashboard`,

  } as const;

  // Department endpoints
  static readonly DEPARTMENT = {
    DASHBOARD: `${ApiEndpoints.BASE_URL}/department/dashboard`,

  } as const;

  // User endpoints
  static readonly USER = {
    GET_PROFILE: `${ApiEndpoints.BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${ApiEndpoints.BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${ApiEndpoints.BASE_URL}/user/change-password`,
  } as const;
}
