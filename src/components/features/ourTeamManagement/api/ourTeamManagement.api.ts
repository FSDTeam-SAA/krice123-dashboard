import axiosInstance from "@/lib/instance/axios-instance";
import { OurTeamResponse } from "../types/ourTeamManagement.types";

// get all our team data
export const getOurTeam = async (
  page: number = 1,
  limit: number = 10,
): Promise<OurTeamResponse> => {
  const response = await axiosInstance.get("/members", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// delete team member
export const deleteTeamMember = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/members/${id}`);
};

// create team member
export const createTeamMember = async (
  formData: FormData,
): Promise<OurTeamResponse> => {
  const response = await axiosInstance.post("/members", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// update team member
export const updateTeamMember = async (
  id: string,
  formData: FormData,
): Promise<OurTeamResponse> => {
  const response = await axiosInstance.put(`/members/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
