import { Injectable, signal } from '@angular/core';

/**
 * Global loader service to manage loading state across the application
 * Tracks active HTTP requests and shows/hides loader automatically
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly _isLoading = signal<boolean>(false);
  private activeRequests = 0;

  /**
   * Public readonly signal for components to subscribe to
   */
  readonly isLoading = this._isLoading.asReadonly();

  /**
   * Show the global loader
   * Increments active request counter
   */
  show(): void {
    this.activeRequests++;
    if (this.activeRequests > 0) {
      this._isLoading.set(true);
    }
  }

  /**
   * Hide the global loader
   * Decrements active request counter
   * Only hides when all requests are complete
   */
  hide(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this._isLoading.set(false);
    }
  }

  /**
   * Force hide the loader regardless of active requests
   * Use with caution - mainly for error scenarios
   */
  forceHide(): void {
    this.activeRequests = 0;
    this._isLoading.set(false);
  }
}
