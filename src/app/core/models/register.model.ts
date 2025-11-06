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
export interface CountryDropdown {
  countryid: number;
  name: string;
}
export interface StateDropdown {
  name: string;
  stateid: number;
}
export interface CityDropdown {
  cityid: number;
  name: string;
}

export interface DropdownCountryModel {
  data: CountryDropdown[];
  message: string;
  status: string;
  statusCode: number;
}
  
export interface DropdownStateModel {
  data: StateDropdown[];
  message: string;
  status: string;
  statusCode: number;
}

export interface DropdownCityModel {
  data: CityDropdown[];
  message: string;
  status: string;
  statusCode: number;
}


