import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-submission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-submission.html',
  styleUrls: ['./final-submission.css'],
})
export class FinalSubmission {
  @Input() summary: any;

 scrollToSection(step: number): void {
    const sectionId = `step-${step}`;
    const element = document.getElementById(sectionId);

    if (!element) {
      console.log('scrollToSection: element not found', sectionId);
      return;
    }

    console.log('scrollToSection: scrolling to', sectionId);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  // 2) Your existing getter – keep as‑is
  get finalMessageParagraphs(): string[] {
    const msg = this.summary?.ai_assessment?.final_message;
    if (!msg) return [];

    const normalized = msg.replace(/\r\n/g, '\n');

    return normalized
      .split(/\n{2,}/)
      .map((p: string) => p.trim())
      .filter(Boolean);
  }
}
