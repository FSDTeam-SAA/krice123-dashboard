// src/components/features/settings/hook/useSetting.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChangePasswordData,
  UpdateProfileData,
  changePassword,
  getProfileInfo,
  updateProfileInfo,
} from "../api/setting.api";
import { AxiosError } from "axios";

// Change Password in profile
export const useChangePassword = () => {
  return useMutation<
    unknown,
    AxiosError<{ message?: string }>,
    ChangePasswordData
  >({
    mutationFn: (data: ChangePasswordData) => changePassword(data),
  });
};

interface ProfileInfoResponse {
  success: boolean;
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    image?: string;
  };
}

// get profile info
export const useGetProfileInfo = (userId: string) => {
  return useQuery<ProfileInfoResponse, AxiosError<{ message?: string }>>({
    queryKey: ["profile-info", userId],
    queryFn: () => getProfileInfo(userId),
    enabled: !!userId,
  });
};

// update profile info
export const useUpdateProfileInfo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    AxiosError<{ message?: string }>,
    UpdateProfileData
  >({
    mutationFn: (data: UpdateProfileData) => updateProfileInfo(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-info", userId] });
    },
  });
};
