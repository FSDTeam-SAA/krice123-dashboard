import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeamMember,
  deleteTeamMember,
  getOurTeam,
  updateTeamMember,
} from "../api/ourTeamManagement.api";

// get all our team data
export const useOurTeam = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["our-team", page, limit],
    queryFn: () => getOurTeam(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

// delete hook
export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeamMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["our-team"] });
    },
  });
};

// create hook
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createTeamMember(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["our-team"] });
    },
  });
};

// update hook
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateTeamMember(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["our-team"] });
    },
  });
};
