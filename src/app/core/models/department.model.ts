
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
