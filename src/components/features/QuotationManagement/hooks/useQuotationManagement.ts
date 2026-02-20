import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteQuotationManagement,
  getQuotationManagement,
} from "../api/quotationManagement.api";

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

// delete hook
export const useDeleteQuotationManagement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuotationManagement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotation-management"] });
    },
  });
};
