// src/components/features/settings/api/setting.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// POST /api/auth/change-password
export const changePassword = async (data: ChangePasswordData) => {
  const response = await axiosInstance.post("/auth/change-password", data);
  return response.data;
};
