// src/components/features/contactManagement/hooks/useContactManagement.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteContactManagement,
  getContactManagement,
} from "../api/contactManagement.api";

export const useContactManagement = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["contact-management", page, limit],
    queryFn: () => getContactManagement(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

// delete hook
export const useDeleteContactManagement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContactManagement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-management"] });
    },
  });
};
