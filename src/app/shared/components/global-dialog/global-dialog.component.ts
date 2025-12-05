import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-global-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './global-dialog.component.html',
  styleUrls: ['./global-dialog.component.css'],
})
export class GlobalDialogComponent {
  @Input() visible = false;
  @Input() headerTitle = '';
  @Input() headerDescription = '';
  @Input() width = '90vw';
  @Input() maxWidth = '440px';
  @Input() closable = true;
  @Input() draggable = false;
  @Input() resizable = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.onClose.emit();
  }

  onHide(): void {
    this.visibleChange.emit(this.visible);
    this.onClose.emit();
  }
}
