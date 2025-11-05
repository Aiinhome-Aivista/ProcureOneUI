import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';

import { ApiEndpoints } from '../config/api-endpoints';
import {
  User,
  LoginCredentials,
  AuthResponse,
  UserRole,
  ApiLoginRequest,
  ApiLoginResponse,
  ApiErrorResponse
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // Signals for reactive state management
  private readonly currentUserSignal = signal<User | null>(null);
  private readonly isLoadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  // Computed signals
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
  readonly userRole = computed(() => this.currentUserSignal()?.role);

  // Storage keys
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';

  constructor() {
    this.loadUserFromStorage();
  }

  /**
   * Load user from local storage on initialization
   */
  private loadUserFromStorage(): void {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userStr = localStorage.getItem(this.USER_KEY);

      if (token && userStr) {
        const user = JSON.parse(userStr);
        this.currentUserSignal.set(user);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.clearStorage();
    }
  }

  /**
   * Login with credentials
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    const payload: ApiLoginRequest = {
      username: credentials.username,
      password: credentials.password
    };

    return this.http.post<ApiLoginResponse>(ApiEndpoints.AUTH.LOGIN, payload).pipe(
      map(apiResponse => this.transformApiResponse(apiResponse)),
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        const errorMessage = this.handleError(error);
        this.errorSignal.set(errorMessage);
        this.isLoadingSignal.set(false);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Transform API response to internal AuthResponse format
   */
  private transformApiResponse(apiResponse: ApiLoginResponse): AuthResponse {
    if (!apiResponse.isSuccess) {
      throw new Error(apiResponse.message || 'Login failed');
    }

    const { data } = apiResponse;

    // Map API role to internal role
    const roleMapping: Record<string, UserRole> = {
      'Vendor': 'vendor',
      'vendor': 'vendor',
      'Department': 'department',
      'department': 'department',
      'Admin': 'department',
      'admin': 'department'
    };

    const role = roleMapping[data.role];

    // If role is not mapped, throw error instead of defaulting
    if (!role) {
      throw new Error(`Unsupported user role: ${data.role}`);
    }

    const user: User = {
      id: data.user_id.toString(),
      email: data.email,
      name: data.username,
      role: role,
      createdAt: new Date(),
      lastLogin: new Date()
    };

    const authResponse: AuthResponse = {
      user,
      token: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: 3600 // Default to 1 hour
      }
    };

    return authResponse;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      // Server-side error
      if (error.error && typeof error.error === 'object') {
        const apiError = error.error as ApiErrorResponse;
        if (apiError.message) {
          return apiError.message;
        }
        if (apiError.errors) {
          const errorMessages = Object.values(apiError.errors).flat();
          return errorMessages.join(', ');
        }
      }

      // HTTP error status messages
      if (error.status === 0) {
        return 'Unable to connect to server. Please check your internet connection.';
      }
      if (error.status === 401) {
        return 'Invalid username or password.';
      }
      if (error.status === 403) {
        return 'Access forbidden. Please contact support.';
      }
      if (error.status === 404) {
        return 'Login service not found. Please contact support.';
      }
      if (error.status >= 500) {
        return 'Server error. Please try again later.';
      }

      return error.error?.message || error.message || 'An error occurred during login.';
    }

    // Client-side error
    if (error instanceof Error) {
      return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    this.currentUserSignal.set(response.user);
    localStorage.setItem(this.TOKEN_KEY, response.token.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.token.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.isLoadingSignal.set(false);

    // Redirect based on role
    this.redirectToDefaultPage(response.user.role);
  }

  /**
   * Logout user
   */
  logout(): void {
    this.currentUserSignal.set(null);
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  /**
   * Clear storage
   */
  private clearStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Redirect to default page based on user role
   */
  redirectToDefaultPage(role: UserRole): void {
    const defaultPages: Record<UserRole, string> = {
      vendor: '/vendor/dashboard',
      department: '/department/dashboard'
    };

    const targetPage = defaultPages[role];
    if (targetPage) {
      this.router.navigate([targetPage]);
    } else {
      console.error('Invalid role for redirect:', role);
      this.router.navigate(['/login']);
    }
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: UserRole): boolean {
    return this.currentUserSignal()?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: UserRole[]): boolean {
    const userRole = this.currentUserSignal()?.role;
    return userRole ? roles.includes(userRole) : false;
  }
}
