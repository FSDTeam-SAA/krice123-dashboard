// src/components/features/contactManagement/api/contactManagement.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { ContactResponse } from "../types/contact.types";

// get all contact management
export const getContactManagement = async (
  page: number = 1,
  limit: number = 10,
): Promise<ContactResponse> => {
  const response = await axiosInstance.get("/contact-us", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// delete contact management
export const deleteContactManagement = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/contact-us/${id}`);
};
