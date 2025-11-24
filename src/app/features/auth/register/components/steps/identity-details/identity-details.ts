import {
  Component,
  signal,
  computed,
  inject,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { catchError, forkJoin, of, Subscription } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { RegisterService } from '../../../../../../core/services';
import { DropdownModel} from '../../../../../../core/models';

@Component({
  selector: 'app-identity-details',
  imports: [ReactiveFormsModule, CommonModule, SelectModule],
  templateUrl: './identity-details.html',
  styleUrl: './identity-details.css',
})
export class IdentityDetails implements OnInit, OnDestroy {
  constructor(private apiService: RegisterService) {}

  @Input() set data(value: any) {
    if (!value) {
      this.identityForm.reset({}, { emitEvent: false });
      this.addressForm.reset({}, { emitEvent: false });
      return;
    }

    // Patch / reset forms safely depending on incoming keys
    const identityKeys = [
      'companyName',
      'registrationNumber',
      'businessType',
      'industryCategory',
      'dateOfIncorporation',
      'natureOfBusiness',
    ];
    const addressKeys = [
      'registeredAddress',
      'operationalAddress',
      'country',
      'state',
      'city',
      'pin',
      'contactPerson',
      'designation',
      'email',
      'phone',
      'alternateContact',
    ];

    const hasIdentity = identityKeys.some((k) => k in value);
    const hasAddress = addressKeys.some((k) => k in value);

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
  //  signal to hold dropdown data
  private readonly _businessTypes = signal<DropdownModel['data']>([]);
  readonly businessTypes = computed(() => this._businessTypes());

  private readonly _industryCategories = signal<DropdownModel['data']>([]);
  readonly industryCategories = computed(() => this._industryCategories());

  private readonly _designations = signal<DropdownModel['data']>([]);
  readonly designations = computed(() => this._designations());

  private readonly _countries = signal<DropdownModel['data']>([]);
  readonly countries = computed(() => this._countries());

  private readonly _states = signal<DropdownModel['data']>([]);
  readonly states = computed(() => this._states());

  private readonly _cities = signal<DropdownModel['data']>([]);
  readonly cities = computed(() => this._cities());

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
  get companyName(): AbstractControl {
    return this.identityForm.get('companyName')!;
  }
  get registrationNumber(): AbstractControl {
    return this.identityForm.get('registrationNumber')!;
  }
  get businessType(): AbstractControl {
    return this.identityForm.get('businessType')!;
  }
  get industryCategory(): AbstractControl {
    return this.identityForm.get('industryCategory')!;
  }
  get dateOfIncorporation(): AbstractControl {
    return this.identityForm.get('dateOfIncorporation')!;
  }
  get natureOfBusiness(): AbstractControl {
    return this.identityForm.get('natureOfBusiness')!;
  }

  get registeredAddress(): AbstractControl {
    return this.addressForm.get('registeredAddress')!;
  }
  get operationalAddress(): AbstractControl {
    return this.addressForm.get('operationalAddress')!;
  }
  get country(): AbstractControl {
    return this.addressForm.get('country')!;
  }
  get state(): AbstractControl {
    return this.addressForm.get('state')!;
  }
  get city(): AbstractControl {
    return this.addressForm.get('city')!;
  }
  get pin(): AbstractControl {
    return this.addressForm.get('pin')!;
  }
  get contactPerson(): AbstractControl {
    return this.addressForm.get('contactPerson')!;
  }
  get designation(): AbstractControl {
    return this.addressForm.get('designation')!;
  }
  get email(): AbstractControl {
    return this.addressForm.get('email')!;
  }
  get phone(): AbstractControl {
    return this.addressForm.get('phone')!;
  }
  get alternateContact(): AbstractControl {
    return this.addressForm.get('alternateContact')!;
  }

  ngOnInit(): void {
    this.loadDropdowns();

    // When country changes, fetch states
    this.subs.add(
      this.addressForm.get('country')!.valueChanges.subscribe((countryId: number) => {
        if (countryId) {
          this.fetchStates(countryId);
        } else {
          this._states.set([]);
          this.addressForm.get('state')!.reset();
        }
      })
    );
    
    // When state changes, fetch cities
    this.subs.add(
      this.addressForm.get('state')!.valueChanges.subscribe((stateId: number) => {
        if (stateId) {
          this.fetchCities(stateId);
        } else {
          this._cities.set([]);
          this.addressForm.get('city')!.reset();
        }
      })
    );
    
    // emit when active form changes
    this.subs.add(
      this.identityForm.valueChanges.subscribe((v) => {
        if (this.activeTab() === 'identity') {
          this.dataChange.emit({ ...v });
        }
      })
    );
    this.subs.add(
      this.addressForm.valueChanges.subscribe((v) => {
        if (this.activeTab() === 'addresses') {
          this.dataChange.emit({ ...v });
        }
      })
    );
  }

  // //  Fetch dropdown data from API and store in signal
  // loadDropdowns(): void {
  //   this.apiService.businessTypes().subscribe({
  //     next: (res: any) => {
  //       if (res?.isSuccess && Array.isArray(res.data)) {
  //         this._businessTypes.set(res.data);
  //       }
  //     },
  //     error: err => console.error('Error fetching dropdowns:', err)
  //   });
  // }

  public loadDropdowns(): void {
    forkJoin({
      businessTypes: this.apiService
        .businessTypes()
        .pipe(
          catchError(() =>
            of<DropdownModel>({ isSuccess: false, data: [], message: '', statusCode: 500 })
          )
        ),
      industryCategories: this.apiService
        .industryCategories()
        .pipe(
          catchError(() =>
            of<DropdownModel>({ isSuccess: false, data: [], message: '', statusCode: 500 })
          )
        ),
      designations: this.apiService
        .designations()
        .pipe(
          catchError(() =>
            of<DropdownModel>({ isSuccess: false, data: [], message: '', statusCode: 500 })
          )
        ),
      countries: this.apiService
        .countries()
        .pipe(
          catchError(() =>
            of<DropdownModel>({ status: 'error', data: [], message: '', statusCode: 500 })
          )
        ),
    }).subscribe({
      next: (res) => {
        if (res.businessTypes.isSuccess) {
          this._businessTypes.set(res.businessTypes.data);
        }
        if (res.industryCategories.isSuccess) {
          this._industryCategories.set(res.industryCategories.data);
        }
        if (res.designations.isSuccess) {
          this._designations.set(res.designations.data);
        }
        if (res.countries) {
          this._countries.set(res.countries.data);
        }
      },
      error: (err) => {
        console.error('Error loading dropdowns:', err);
      },
    });
  }

  private fetchStates(countryId: number): void {
    const body = { countryid: countryId };
    this.apiService.states(body).subscribe({
      next: (res: any) => {
        if (res?.data && Array.isArray(res.data)) {
          this._states.set(res.data);
        } else {
          this._states.set([]);
        }
      },
      error: (err) => {
        console.error('Error fetching states:', err);
        this._states.set([]);
      },
    });
  }

  private fetchCities(stateId: number): void {
    const body = { stateid: stateId };
    this.apiService.cities(body).subscribe({
      next: (res: any) => {
        if (res?.data && Array.isArray(res.data)) {
          this._cities.set(res.data);
        } else {
          this._cities.set([]);
        }
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
        this._cities.set([]);
      },
    });
  }

  public resetForm(): void {
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

  public resetAllForms(): void {
    this.identityForm.reset();
    this.identityForm.markAsPristine();
    this.identityForm.markAsUntouched();

    this.addressForm.reset();
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();

    this._states.set([]);
    this._cities.set([]);
    this.tabSignal.set('identity');
    this.dataChange.emit({ ...this.identityForm.value, ...this.addressForm.value });
  }

  public onSubmit(): void {
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
