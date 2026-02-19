// src/components/features/QuotationManagement/types/quotation.types.ts

export interface QuotationPriorities {
  communication: number;
  reliability: number;
  experience: number;
  quality: number;
  cost: number;
}

export interface Quotation {
  _id: string;
  priorities: QuotationPriorities;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  spouseFirstName: string;
  spouseLastName: string;
  streetAddress: string;
  streetAddressLine2: string;
  city: string;
  stateOrProvince: string;
  postalOrZipCode: string;
  isLegalOwner: boolean;
  siteAddressIfDifferent: string;
  isSiteReadyToWorkOn: boolean;
  workType: string;
  hasBuiltOrRenovatedBefore: boolean;
  hasSelectedArchitectOrDesigner: boolean;
  hasAllPropertyInfo: boolean;
  hasPermitsApproved: boolean;
  budget: string;
  hasFinancing: string;
  haveSelected: string;
  expectationsExperienceHelp: string;
  desiredStartTime: string;
  preBuildRequirements: string;
  specialRequirements: string;
  hearAboutUs: string;
  expectationsBuilder: string;
  planFiles: string[];
  builderExpectations: string;
  wantsFreeMaintenance: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface QuotationResponse {
  success: boolean;
  data: Quotation[];
  meta: PaginationMeta;
}
