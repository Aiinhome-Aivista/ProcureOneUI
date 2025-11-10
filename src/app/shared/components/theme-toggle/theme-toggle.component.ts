import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../core/services';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule],
  template: `
    <button
      pButton
      type="button"
      [icon]="icon()"
      severity="secondary"
      [text]="true"
      [rounded]="true"
      class="theme-toggle-btn bg-red-300"
      (click)="toggleTheme()"
      [attr.aria-label]="ariaLabel()"
      pTooltip="Toggle theme"
      tooltipPosition="bottom"
    ></button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .theme-toggle-btn {
      width: 2.5rem;
      height: 2.5rem;
      transition: all var(--transition-fast);
    }
    
    .theme-toggle-btn:hover {
      background-color: var(--bg-hover) !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly isDark = computed(() => this.themeService.activeTheme() === 'dark');
  readonly icon = computed(() => this.isDark() ? 'pi pi-sun' : 'pi pi-moon');
  readonly ariaLabel = computed(() => 
    `Switch to ${this.isDark() ? 'light' : 'dark'} mode`
  );

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
