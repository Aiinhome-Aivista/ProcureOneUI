import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { submissionData } from '../../../../../../data/data';

@Component({
  selector: 'app-final-submission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-submission.html',
  styleUrl: './final-submission.css',
})
export class FinalSubmission {
  readonly submissionData = submissionData;
}