import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AIEvaluationData {
  executiveSummary: string;
  strengths: string[];
  potentialRisks: string[];
  recommendationScore: number;
  scoreBreakdown: string;
}

@Component({
  selector: 'app-ai-review',
  imports: [CommonModule],
  templateUrl: './ai-review.html',
  styleUrl: './ai-review.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiReview {
  readonly evaluationData = signal<AIEvaluationData>({
    executiveSummary: 'Innovatech Solutions Ltd. presents a strong application with robust financial health and verified documentation. The primary area for consideration is the minor geopolitical risk associated with one of their operational centers.',
    strengths: [
      'Exceeds financial stability benchmarks by 35%.',
      'Possesses all required industry certifications (ISO 9001, ISO 27001).',
      'Strong positive customer references from similar enterprise clients.'
    ],
    potentialRisks: [
      'Attention Needed: Geopolitical risk factor score of 6.2/10. Could impact supply chain stability in the long term.'
    ],
    recommendationScore: 92,
    scoreBreakdown: 'Calculated based on a weighted average of Financial Health(40%), Risk Profile(30%), Capability (20%) and Reputation(10%)'
  });

  getScoreColor(): string {
    const score = this.evaluationData().recommendationScore;
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }
}
