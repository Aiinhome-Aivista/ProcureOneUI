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
    LOGOUT: `${ApiEndpoints.BASE_URL}/AuthMicroservices/logout`,
    REFRESH_TOKEN: `${ApiEndpoints.BASE_URL}/AuthMicroservices/refresh-token`,
    REGISTER: `${ApiEndpoints.BASE_URL}/AuthMicroservices/register`,
    BUSINESS_TYPES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/business_types`,
    INDUSTRY_CATEGORIES: `${ApiEndpoints.BASE_URL}/VendorMicroservices/industry_categories`,
    FORGOT_PASSWORD: `${ApiEndpoints.BASE_URL}/AuthMicroservices/forgot-password`,
    RESET_PASSWORD: `${ApiEndpoints.BASE_URL}/AuthMicroservices/reset-password`,
    CERTIFICATE_iNCORPORATION: `${ApiEndpoints.BASE_URL}/VendorMicroservices/legal_proofs`
  } as const;

  // Vendor endpoints
  static readonly VENDOR = {
    DASHBOARD: `${ApiEndpoints.BASE_URL}/vendor/dashboard`,
    PRODUCTS: `${ApiEndpoints.BASE_URL}/vendor/products`,
    ORDERS: `${ApiEndpoints.BASE_URL}/vendor/orders`,
    ANALYTICS: `${ApiEndpoints.BASE_URL}/vendor/analytics`,
    PROFILE: `${ApiEndpoints.BASE_URL}/vendor/profile`
  } as const;

  // Department endpoints
  static readonly DEPARTMENT = {
    DASHBOARD: `${ApiEndpoints.BASE_URL}/department/dashboard`,
    REQUESTS: `${ApiEndpoints.BASE_URL}/department/requests`,
    APPROVALS: `${ApiEndpoints.BASE_URL}/department/approvals`,
    REPORTS: `${ApiEndpoints.BASE_URL}/department/reports`,
    PROFILE: `${ApiEndpoints.BASE_URL}/department/profile`
  } as const;

  // User endpoints
  static readonly USER = {
    GET_PROFILE: `${ApiEndpoints.BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${ApiEndpoints.BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${ApiEndpoints.BASE_URL}/user/change-password`
  } as const;
}
