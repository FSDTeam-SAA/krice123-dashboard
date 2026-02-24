// src/components/features/dashboard/hooks/useDashboard.ts

import { useQuery } from "@tanstack/react-query";
import { getContactUs, getDashboardStats, getMonthlyQuotations, getProjects } from "../api/dashboard.api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getDashboardStats(),
  });
};

//  useMonthlyQuotations
export const useMonthlyQuotations = () => {
  return useQuery({
    queryKey: ["monthly-quotations"],
    queryFn: () => getMonthlyQuotations(),
  });
};


//  useContactUs
export const useContactUs = () => {
  return useQuery({
    queryKey: ["contact-us"],
    queryFn: () => getContactUs(),
  });
};

//  useProjects
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
};