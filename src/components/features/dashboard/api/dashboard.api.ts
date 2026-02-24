// src/components/features/dashboard/api/dashboard.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

export interface DashboardStatsResponse {
  success: boolean;
  data: {
    totalQuotations: number;
    totalUsers: number;
    totalContactMessages: number;
  };
}

export interface MonthlyQuotation {
  count: number;
  year: number;
  month: number;
}

export interface MonthlyQuotationResponse {
  success: boolean;
  data: MonthlyQuotation[];
}

export interface ContactUs {
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

export interface ContactUsResponse {
  success: boolean;
  data: ContactUs[];
}

export interface Project {
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

export interface ProjectsResponse {
  success: boolean;
  data: Project[];
}

// get all dashboard stats
export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
  const response = await axiosInstance.get("/dashboard/stats");
  return response.data;
};

//   get monthly quotations
export const getMonthlyQuotations =
  async (): Promise<MonthlyQuotationResponse> => {
    const response = await axiosInstance.get("/dashboard/monthly-quotations");
    return response.data;
  };

// get /contact-us data
export const getContactUs = async (): Promise<ContactUsResponse> => {
  const response = await axiosInstance.get("/contact-us");
  return response.data;
};

// get /projects data
export const getProjects = async (): Promise<ProjectsResponse> => {
  const response = await axiosInstance.get("/past-projects");
  return response.data;
};
