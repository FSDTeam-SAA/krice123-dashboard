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
