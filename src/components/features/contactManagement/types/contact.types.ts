export interface Contact {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContactResponse {
  success: boolean;
  data: Contact[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
