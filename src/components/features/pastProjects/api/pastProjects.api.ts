// src/components/features/pastProjects/api/pastProjects.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { PastProjectResponse } from "../types/pastProjects.types";

// get all past projects
export const getPastProjects = async (
  page: number = 1,
  limit: number = 10,
): Promise<PastProjectResponse> => {
  const response = await axiosInstance.get("/past-projects", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// delete past project
export const deletePastProject = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/past-projects/${id}`);
};

// create past project
export const createPastProject = async (
  formData: FormData,
): Promise<PastProjectResponse> => {
  const response = await axiosInstance.post("/past-projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// update past project
export const updatePastProject = async (
  id: string,
  formData: FormData,
): Promise<PastProjectResponse> => {
  const response = await axiosInstance.patch(`/past-projects/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
