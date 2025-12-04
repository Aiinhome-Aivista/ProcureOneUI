import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-button.component.html',
  styleUrls: ['./global-button.component.css'],
})
export class GlobalButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'filled' | 'outlined' = 'filled';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() customClass = '';
  @Input() icon = '';
  @Input() iconPos: 'left' | 'right' = 'left';

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
