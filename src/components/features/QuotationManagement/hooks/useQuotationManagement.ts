// src/components/features/QuotationManagement/hooks/useQuotationManagement.ts
import { useQuery } from "@tanstack/react-query";
import { getQuotationManagement } from "../api/quotationManagement.api";

export const useQuotationManagement = (
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["quotation-management", page, limit],
    queryFn: () => getQuotationManagement(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
