export interface NavItem {
  stepNo: number;
  title: string;
  description: string;
}

export interface DropdownData {
  id: number;
  name: string;
}
export interface DropdownModel {
  data: DropdownData[];
  isSuccess: boolean;
  message: string;
  statusCode: number;
}


