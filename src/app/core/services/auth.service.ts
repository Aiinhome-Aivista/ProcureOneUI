import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, of, delay } from 'rxjs';
import type { User, LoginCredentials, AuthResponse, UserRole } from '../models/user.model';

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
   * For demo purposes, this uses mock data. Replace with actual API call.
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    
    // Mock API call - replace with actual HTTP request
    return this.mockLogin(credentials).pipe(
      tap((response) => {
        this.handleAuthSuccess(response);
      }),
      catchError((error) => {
        this.errorSignal.set(error.message || 'Login failed');
        this.isLoadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }
  
  /**
   * Mock login for demonstration
   * Replace this with actual API call: this.http.post<AuthResponse>('/api/auth/login', credentials)
   */
  private mockLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock users for testing
    const mockUsers: Record<string, { user: User; password: string }> = {
      'vendor@example.com': {
        password: 'vendor123',
        user: {
          id: '1',
          email: 'vendor@example.com',
          name: 'John Vendor',
          role: 'vendor',
          avatar: 'https://ui-avatars.com/api/?name=John+Vendor',
          createdAt: new Date(),
          lastLogin: new Date()
        }
      },
      'department@example.com': {
        password: 'dept123',
        user: {
          id: '2',
          email: 'department@example.com',
          name: 'Jane Department',
          role: 'department',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Department',
          createdAt: new Date(),
          lastLogin: new Date()
        }
      }
    };
    
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        const mockUser = mockUsers[credentials.email];
        if (!mockUser || mockUser.password !== credentials.password) {
          observer.error(new Error('Invalid email or password'));
          return;
        }
        
        const response: AuthResponse = {
          user: mockUser.user,
          token: {
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            expiresIn: 3600
          }
        };
        
        observer.next(response);
        observer.complete();
      }, 1000);
    });
  }
  
  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(response: AuthResponse): void {
    this.currentUserSignal.set(response.user);
    localStorage.setItem(this.TOKEN_KEY, response.token.accessToken);
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
    localStorage.removeItem(this.USER_KEY);
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
