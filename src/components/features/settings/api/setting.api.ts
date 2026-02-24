// src/components/features/settings/api/setting.api.ts

import axiosInstance from "@/lib/instance/axios-instance";

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
}

// POST /api/auth/change-password
export const changePassword = async (data: ChangePasswordData) => {
  const response = await axiosInstance.post("/auth/change-password", data);
  return response.data;
};

// get profile info
export const getProfileInfo = async (userId: string) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

// update profile info
export const updateProfileInfo = async (
  userId: string,
  data: UpdateProfileData,
) => {
  const response = await axiosInstance.put(`/users/${userId}`, data);
  return response.data;
};
