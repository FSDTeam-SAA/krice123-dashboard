// src/components/features/QuotationManagement/api/quotationManagement.api.ts

import axiosInstance from "@/lib/instance/axios-instance";
import { QuotationResponse } from "../types/quotation.types";

// get all quotation management
export const getQuotationManagement = async (
  page: number = 1,
  limit: number = 10,
): Promise<QuotationResponse> => {
  try {
    const response = await axiosInstance.get("/quotations", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
