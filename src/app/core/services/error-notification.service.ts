import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type ToastSeverity = 'error' | 'warn' | 'info';

@Injectable({ providedIn: 'root' })
export class ErrorNotificationService {
  private readonly messageService = inject(MessageService);
  private readonly lifetimeMs = 6000;

  notify(error: HttpErrorResponse): void {
    const status = error.status || 0;
    const summary = this.resolveTitle(status);
    const detail = this.resolveDescription(error);
    const severity = this.resolveSeverity(status);

    this.messageService.add({
      key: 'httpErrors',
      severity,
      summary,
      detail,
      life: this.lifetimeMs,
      sticky: severity === 'error',
      closable: true
    });
  }

  private resolveTitle(status: number): string {
    if (status === 0) {
      return 'Connection issue';
    }

    if (status >= 500) {
      return 'Server error';
    }

    if (status === 404) {
      return 'Resource not found';
    }

    if (status === 401) {
      return 'Authentication required';
    }

    if (status === 403) {
      return 'Access denied';
    }

    if (status === 400) {
      return 'Bad request';
    }

    return 'Something went wrong';
  }

  private resolveDescription(error: HttpErrorResponse): string {
    const extracted = this.extractMessage(error);
    if (extracted) {
      return extracted;
    }

    const status = error.status || 0;

    if (status === 0) {
      return 'We could not reach the server. Check your connection and try again.';
    }

    if (status >= 500) {
      return 'The server encountered an issue. Please retry in a moment.';
    }

    if (status === 404) {
      return 'The requested resource is unavailable or may have been moved.';
    }

    if (status === 401) {
      return 'Your session may have expired. Please sign in again to continue.';
    }

    if (status === 403) {
      return 'You do not have permission to view this content. Try a different account or request access.';
    }

    if (status === 400) {
      return 'The request could not be processed. Check the submitted information and try again.';
    }

    return 'Please try again or contact support if the problem persists.';
  }

  private extractMessage(error: HttpErrorResponse): string | undefined {
    if (typeof error.error === 'string') {
      const sanitized = this.sanitizeText(error.error);
      if (sanitized) {
        return sanitized;
      }
    }

    if (error.error && typeof error.error === 'object') {
      const payload = error.error as Record<string, unknown>;
      const raw = typeof payload['message'] === 'string' ? payload['message'] : undefined;
      const sanitized = raw ? this.sanitizeText(raw) : undefined;
      if (sanitized) {
        return sanitized;
      }
    }

    if (typeof error.message === 'string') {
      const sanitized = this.sanitizeText(error.message);
      if (sanitized) {
        return sanitized;
      }
    }

    return undefined;
  }

  private sanitizeText(content: string): string | undefined {
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      return undefined;
    }

    if (trimmed.startsWith('Http failure response')) {
      return undefined;
    }

    const containsHtml = /<[^>]+>/.test(trimmed);
    if (containsHtml) {
      return undefined;
    }

    return trimmed;
  }

  private resolveSeverity(status: number): ToastSeverity {
    if (status === 0 || status >= 500) {
      return 'error';
    }

    if (status === 404 || status === 401 || status === 403) {
      return 'warn';
    }

    return 'info';
  }
}
