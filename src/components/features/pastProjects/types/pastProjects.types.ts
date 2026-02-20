export interface PastProject {
  _id: string;
  title: string;
  description: string;
  pastImage: string;
  remodelImage: string;
  thumbnailImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PastProjectResponse {
  success: boolean;
  data: PastProject[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
