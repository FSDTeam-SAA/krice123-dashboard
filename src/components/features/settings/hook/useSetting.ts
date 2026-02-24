// src/components/features/settings/hook/useSetting.ts

// change-password
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordData, changePassword } from "../api/setting.api";
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
