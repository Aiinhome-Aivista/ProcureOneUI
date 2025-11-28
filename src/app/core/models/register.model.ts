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
  documents: string[];  // array of file names
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
