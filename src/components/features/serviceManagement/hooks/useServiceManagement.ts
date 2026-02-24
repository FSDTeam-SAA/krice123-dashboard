import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createService,
  deleteService,
  getAllServiceManagementData,
  updateService,
} from "../api/serviceManagement.api";

// useServiceManagement
export const useServiceManagement = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["service-management", page, limit],
    queryFn: () => getAllServiceManagementData(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

// delete hook
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-management"] });
    },
  });
};

// create hook
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-management"] });
    },
  });
};

// update hook
export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-management"] });
    },
  });
};
