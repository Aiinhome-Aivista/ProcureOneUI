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



