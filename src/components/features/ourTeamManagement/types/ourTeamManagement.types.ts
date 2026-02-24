export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OurTeamResponse {
  success: boolean;
  data: TeamMember[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
