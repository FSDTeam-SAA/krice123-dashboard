// src/components/features/dashboard/hooks/useDashboard.ts

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getMonthlyQuotations } from "../api/dashboard.api";

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
