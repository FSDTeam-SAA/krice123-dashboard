import axiosInstance from "@/lib/instance/axios-instance";
import { ServiceManagementResponse } from "../types/serviceManagement.types";

// Get All Service Management Data
export const getAllServiceManagementData = async (
  page: number = 1,
  limit: number = 10,
): Promise<ServiceManagementResponse> => {
  const response = await axiosInstance.get("/services", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// Delete Service
export const deleteService = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/services/${id}`);
};

// Create Service
export const createService = async (
  formData: FormData,
): Promise<ServiceManagementResponse> => {
  const response = await axiosInstance.post("/services", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update Service
export const updateService = async (
  id: string,
  formData: FormData,
): Promise<ServiceManagementResponse> => {
  const response = await axiosInstance.put(`/services/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
