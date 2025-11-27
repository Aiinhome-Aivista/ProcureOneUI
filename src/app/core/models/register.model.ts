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
  business_type: string;
  city: string;
  company_name: string;
  contact_person: string;
  country: string;
  date_of_incorporation: string;
  designation_role: string;
  email_official: string;
  industry_category: string;
  nature_of_business: string;
  operational_address: string;
  phone_number_official: string;
  pin: string;
  registered_address: string;
  registration_number: string;
  state: string;
  vendor_id: string;
}

