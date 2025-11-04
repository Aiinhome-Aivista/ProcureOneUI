import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './step1-basic-info.component.html',
  styleUrls: ['./step1-basic-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  host: {
    role: 'main'
  }
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  @Input() set data(value: any) {
    if (!value) {
      this.identityForm.reset({}, { emitEvent: false });
      this.addressForm.reset({}, { emitEvent: false });
      return;
    }

    // Patch / reset forms safely depending on incoming keys
    const identityKeys = ['companyName', 'registrationNumber', 'businessType', 'industryCategory', 'dateOfIncorporation', 'natureOfBusiness'];
    const addressKeys = ['registeredAddress', 'operationalAddress', 'country', 'state', 'city', 'pin', 'contactPerson', 'designation', 'email', 'phone', 'alternateContact'];

    const hasIdentity = identityKeys.some(k => k in value);
    const hasAddress = addressKeys.some(k => k in value);

    if (hasIdentity) {
      this.identityForm.reset(value, { emitEvent: false });
    }
    if (hasAddress) {
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

  // Patterns
  private readonly registrationPattern = /^[A-Za-z0-9:\/\-\s]+$/;
  private readonly pinPattern = /^[0-9]{6}$/;
  private readonly phonePattern = /^[0-9+\-\s]{7,20}$/;

  // Forms
  readonly identityForm: FormGroup = inject(FormBuilder).group({
    companyName: ['', [Validators.required, Validators.minLength(3)]],
    registrationNumber: ['', [Validators.required, Validators.pattern(this.registrationPattern)]],
    businessType: ['', Validators.required],
    industryCategory: ['', Validators.required],
    dateOfIncorporation: ['', [Validators.required, this.futureDateValidator]],
    natureOfBusiness: ['', [Validators.required, Validators.maxLength(500)]],
  });

  readonly addressForm: FormGroup = inject(FormBuilder).group({
    registeredAddress: ['', Validators.required],
    operationalAddress: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    pin: ['', [Validators.required, Validators.pattern(this.pinPattern)]],
    contactPerson: ['', Validators.required],
    designation: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    alternateContact: [''],
  });

  // Getters for template convenience
  get companyName(): AbstractControl { return this.identityForm.get('companyName')!; }
  get registrationNumber(): AbstractControl { return this.identityForm.get('registrationNumber')!; }
  get businessType(): AbstractControl { return this.identityForm.get('businessType')!; }
  get industryCategory(): AbstractControl { return this.identityForm.get('industryCategory')!; }
  get dateOfIncorporation(): AbstractControl { return this.identityForm.get('dateOfIncorporation')!; }
  get natureOfBusiness(): AbstractControl { return this.identityForm.get('natureOfBusiness')!; }

  get registeredAddress(): AbstractControl { return this.addressForm.get('registeredAddress')!; }
  get operationalAddress(): AbstractControl { return this.addressForm.get('operationalAddress')!; }
  get country(): AbstractControl { return this.addressForm.get('country')!; }
  get state(): AbstractControl { return this.addressForm.get('state')!; }
  get city(): AbstractControl { return this.addressForm.get('city')!; }
  get pin(): AbstractControl { return this.addressForm.get('pin')!; }
  get contactPerson(): AbstractControl { return this.addressForm.get('contactPerson')!; }
  get designation(): AbstractControl { return this.addressForm.get('designation')!; }
  get email(): AbstractControl { return this.addressForm.get('email')!; }
  get phone(): AbstractControl { return this.addressForm.get('phone')!; }
  get alternateContact(): AbstractControl { return this.addressForm.get('alternateContact')!; }

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
      this.identityForm.markAsPristine();
      this.identityForm.markAsUntouched();
      this.dataChange.emit(this.identityForm.value);
    } else {
      this.addressForm.reset();
      this.addressForm.markAsPristine();
      this.addressForm.markAsUntouched();
      this.dataChange.emit(this.addressForm.value);
    }
  }

  onSubmit(): void {
    if (this.activeTab() === 'identity') {
      if (this.identityForm.invalid) {
        this.identityForm.markAllAsTouched();
        return;
      }
      this.dataChange.emit({ ...this.identityForm.value });
    } else {
      if (this.addressForm.invalid) {
        this.addressForm.markAllAsTouched();
        return;
      }
      this.dataChange.emit({ ...this.addressForm.value });
    }
  }

  // Custom validator: no future dates
  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selected = new Date(control.value);
    const today = new Date();
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selected > today ? { futureDate: true } : null;
  }
}
