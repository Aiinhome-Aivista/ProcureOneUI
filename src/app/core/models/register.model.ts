export interface NavItem {
  stepNo: number;
  title: string;
  description: string;
}

export interface DropdownData {
  id?: number;
  countryid?: number;
  stateid?: number;
  cityid?: number;
  name: string;
}
export interface DropdownModel {
  data: DropdownData[];
  isSuccess?: boolean;
  message: string;
  status?: string;
  statusCode: number;
}

export interface BasicInfo {
  company_name: string;
  registration_number: string;
  business_type: string;
  date_of_incorporation: string; // stored as ISO string 'YYYY-MM-DD'
  industry_category: string;
  nature_of_business: string;
  registered_address: string;
  operational_address: string;
  country: string;
  state: string;
  city: string;
  pin: string;
  contact_person: string;
  designation_role: string;
  email_official: string;
  phone_number_official: string;
  alternate_contact: string;
}

export interface BasicInfoResponse {
  current_step: string;
  isSuccess: string;
  message: string;
  status: string;
  statusCode: number;
  vendor_id: string;
}

export interface VendorInfoResponse {
  data: VendorInfo[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorInfo {
  CreatedAt: string;
  CreatedBy: string | null;
  UpdatedAt: string;
  UpdatedBy: string | null;
  alternate_contact: string;
  business_type: string; // numeric ID as string
  city: string; // numeric ID as string
  company_name: string;
  contact_person: string;
  country: string; // numeric ID as string
  date_of_incorporation: string;
  designation_role: string; // numeric ID as string
  email_official: string;
  industry_category: string; // numeric ID as string
  nature_of_business: string;
  operational_address: string;
  phone_number_official: string;
  pin: string;
  registered_address: string;
  registration_number: string;
  state: string; // numeric ID as string
  vendor_id: string;
}

export interface BusinessTaxInfo {
  vendor_id: string;
  pan_number: string;
  gst_vat_number: string;
  msme_udyam_number: string;
  certificate_of_incorporation_number: string;
  legal_authorization_type: string;
  documents: string[]; // array of file names
}

export interface BusinessTaxResponse {
  current_step: 'TAX_DOCS' | string;
  isSuccess: boolean;
  message: string;
  operation: 'inserted' | 'updated' | string;
  status: 'success' | 'error' | string;
  statusCode: number;
  vendor_id: string;
}

export interface VendorTaxDocumentsResponse {
  data: VendorTaxDocumentData[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorTaxDocumentData {
  tax_document_files: TaxDocumentFile[];
  tax_documents: TaxDocuments;
  vendor_id: number;
}

export interface TaxDocumentFile {
  document_url: string;
  vendor_id: number;
}

export interface TaxDocuments {
  certificate_of_incorporation_number: string;
  gst_vat_number: string;
  legal_authorization_type: string;
  msme_udyam_number: string;
  pan_number: string;
  vendor_id: number;
}

export interface BankVerificationResponse {
  current_step: string;
  isSuccess: boolean;
  message: string;
  status: string;
  statusCode: number;
  vendor_id: string;
}

export interface BankVerificationPayload {
  vendor_id: string;
  cancelled_cheque_doc_url: string;
  bank_statement_doc_url: string;
  bank_verification_letter_doc_url: string;
}

export interface BankVerificationFetchResponse {
  data: BankVerificationData[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface BankVerificationData {
  bank_verification: BankVerification;
  vendor_id: string;
}

export interface BankVerification {
  CreatedAt: string;
  UpdatedAt: string;
  bank_statement_doc_url: string;
  bank_verification_letter_doc_url: string;
  cancelled_cheque_doc_url: string;
  vendor_id: string;
}

export interface FinancialDocumentsResponse {
  current_step: string;
  isSuccess: boolean | string;
  message: string;
  status?: string;
  statusCode: number;
  vendor_id: string;
}

export interface VendorFinancialDocumentsResponse {
  data: VendorFinancialDocumentEntry[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorFinancialDocumentEntry {
  audited_balance_sheet_doc_url: string;
  profit_loss_statement_doc_url: string;
  income_tax_return_doc_url: string;
  turnover_declaration_doc_url: string;
  current_step?: string;
  vendor_id: string;
}

export interface VendorRegistrationTrackerResponse {
  data: VendorRegistrationTrackerStep[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorRegistrationTrackerStep {
  status: string;
  step_code: string;
  step_description: string;
  step_name: string;
  vendor_id: string;
}

export interface VendorRegistrationDetailsResponse {
  data: VendorRegistrationDetails[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorRegistrationDetails {
  CreatedAt?: string;
  CreatedBy?: string | null;
  UpdatedAt?: string;
  UpdatedBy?: string | null;
  alternate_contact: string | null;
  bank_verification: BankVerification | null;
  business_type: string | null;
  city: string | null;
  company_name: string;
  contact_person: string;
  country: string | null;
  current_step: string;
  date_of_incorporation: string | null;
  designation_role: string | null;
  email_official: string;
  financial_performance: VendorFinancialDocumentEntry | null;
  industry_category: string | null;
  nature_of_business: string | null;
  operational_address: string | null;
  phone_number_official: string;
  pin: string | null;
  registered_address: string | null;
  registration_number: string | null;
  state: string | null;
  tax_document_files: TaxDocumentFile[];
  tax_documents: TaxDocuments | null;
  vendor_id: string;
}









// AI ASSESSMENT

export interface AiAssessment {
  capability_reason: string;
  capability_score: number;
  created_at: string;
  document_issues: string;
  final_message: string;
  financial_reason: string;
  financial_verification_score: number;
  full_ai_json: string;
  risk_factor_score: number;
  risk_reason: string;
  updated_at: string;
  vendor_id: string;
}


// BANK VERIFICATION

export interface BankVerificationFull {
  bank_statement_doc_url: string | null;
  bank_verification_letter_doc_url: string | null;
  cancelled_cheque_doc_url: string | null;
  vendor_id: string;
}


// BASIC INFO (Matches your existing pattern)

export interface BasicInfoFull {
  CreatedAt?: string;
  CreatedBy?: string | null;
  UpdatedAt?: string;
  UpdatedBy?: string | null;
  alternate_contact: string | null;
  business_type: string | null;
  city: string | null;
  contact_person: string;
  country: string | null;
  date_of_incorporation: string | null;
  designation_role: string | null;
  email_official: string;
  industry_category: string | null;
  nature_of_business: string | null;
  operational_address: string | null;
  phone_number_official: string;
  pin: string | null;
  registered_address: string | null;
  state: string | null;
  vendor_id: string;
}


// FINANCIAL PERFORMANCE

export interface VendorFinancialPerformance {
  audited_balance_sheet_doc_url: string | null;
  income_tax_return_doc_url: string | null;
  profit_loss_statement_doc_url: string | null;
  turnover_declaration_doc_url: string | null;
  vendor_id: string;
}


// REGISTRATION

export interface VendorRegistration {
  company_name: string;
  current_step: string;
  registration_number: string | null;
  status: string;
  vendor_id: string;
}


// TAX DOCUMENTS (files)

export interface TaxDocumentFileFull {
  document_url: string;
  vendor_id: number | string;
}


// TAX INFO

export interface TaxInformation {
  certificate_of_incorporation_number: string | null;
  gst_vat_number: string | null;
  legal_authorization_type: string | null;
  msme_udyam_number: string | null;
  pan_number: string | null;
  vendor_id: number | string;
}


// WRAP EVERYTHING IN MAIN INTERFACE

export interface VendorRegistrationFullData {
  ai_assessment: AiAssessment | null;
  bank_verification: BankVerificationFull | null;
  basic_info: BasicInfoFull | null;
  financial_performance: VendorFinancialPerformance | null;
  registration: VendorRegistration | null;
  tax_files: TaxDocumentFileFull[];
  tax_info: TaxInformation | null;
}


// FINAL API RESPONSE

export interface VendorFullAssessmentResponse {
  data: VendorRegistrationFullData;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

