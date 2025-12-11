
export interface VendorHistoryResponse {
  data: VendorRequest[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorRequest {
  capability_score: number;
  company_name: string;
  financial_verification_score: number;
  nature_of_business: string;
  risk_factor_score: number;
  risk_status:"low" | "medium" | "high";
  score_percent: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | string;
  submission_date: string; // or Date if you will convert
  vendor_id: string;
}




export interface VendorRegCount {
  data: RegistrationItem[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface RegistrationItem {
  additionalValue: AdditionalValue;
  id: string;
  lastValue?: LastValue;
  mainValue: string;
  stats: Stats;
  title: string;
}

export interface AdditionalValue {
  label?: string;
  value?: string;
  [key: string]: any;  // ensures empty objects are still valid
}

export interface LastValue {
  label?: string;
  trend?: string;
  value?: string | number;
}

export interface Stats {
  approved?: number;
  rejected?: number;
  [key: string]: any;
}



export interface VendorDetailsResponse {
  data: VendorDetails;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface VendorDetails {
  Address: string;
  audited_balance_sheet_doc_url: string;
  bank_statement_doc_url: string;
  bank_verification_letter_doc_url: string;
  cancelled_cheque_doc_url: string;
  company_name: string;
  document_url: string;
  gst_vat_number: string;
  income_tax_return_doc_url: string;
  msme_udyam_number: string;
  pan_number: string;
  profit_loss_statement_doc_url: string;
  registration_number: string;
  turnover_declaration_doc_url: string;
  vendor_id: string;
}
