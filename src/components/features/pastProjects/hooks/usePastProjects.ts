// src/components/features/pastProjects/hooks/usePastProjects.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPastProject,
  deletePastProject,
  getPastProjects,
  updatePastProject,
} from "../api/pastProjects.api";

export const usePastProjects = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["past-projects", page, limit],
    queryFn: () => getPastProjects(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

// delete hook
export const useDeletePastProjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePastProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["past-projects"] });
    },
  });
};

// create hook
export const useCreatePastProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createPastProject(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["past-projects"] });
    },
  });
};

// update hook
export const useUpdatePastProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updatePastProject(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["past-projects"] });
    },
  });
};
