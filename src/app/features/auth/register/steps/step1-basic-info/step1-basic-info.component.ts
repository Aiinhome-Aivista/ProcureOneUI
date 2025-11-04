import { ChangeDetectionStrategy, Component, signal, computed, inject, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './step1-basic-info.component.html',
  styleUrls: ['./step1-basic-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  host: {
    'role': 'main'
  }
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  @Input() set data(value: any) {
    if (!value) {
      this.identityForm.reset({}, { emitEvent: false });
      this.addressForm.reset({}, { emitEvent: false });
      return;
    }

    // Reset and patch both forms properly
    if ('companyName' in value || 'registrationNumber' in value) {
      this.identityForm.reset(value, { emitEvent: false });
    }

    if ('registeredAddress' in value || 'operationalAddress' in value) {
      this.addressForm.reset(value, { emitEvent: false });
    }
  }

  @Output() dataChange = new EventEmitter<any>();

  private readonly tabSignal = signal<'identity' | 'addresses'>('identity');
  readonly activeTab = computed(() => this.tabSignal());

  private subs = new Subscription();

  switchTab(tab: 'identity' | 'addresses'): void {
    this.tabSignal.set(tab);
  }

  readonly identityForm: FormGroup = inject(FormBuilder).group({
    companyName: [''],
    registrationNumber: [''],
    businessType: [''],
    industryCategory: [''],
    dateOfIncorporation: [''],
    natureOfBusiness: [''],
  });

  readonly addressForm: FormGroup = inject(FormBuilder).group({
    registeredAddress: [''],
    operationalAddress: [''],
    country: [''],
    state: [''],
    city: [''],
    pin: [''],
    contactPerson: [''],
    designation: [''],
    email: [''],
    phone: [''],
    alternateContact: [''],
  });

  ngOnInit(): void {
    // emit when active form changes
    this.subs.add(this.identityForm.valueChanges.subscribe(v => {
      if (this.activeTab() === 'identity') {
        this.dataChange.emit({ ...v });
      }
    }));
    this.subs.add(this.addressForm.valueChanges.subscribe(v => {
      if (this.activeTab() === 'addresses') {
        this.dataChange.emit({ ...v });
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  resetForm(): void {
    if (this.activeTab() === 'identity') {
      this.identityForm.reset();
      this.dataChange.emit(this.identityForm.value);
    } else {
      this.addressForm.reset();
      this.dataChange.emit(this.addressForm.value);
    }
  }
}