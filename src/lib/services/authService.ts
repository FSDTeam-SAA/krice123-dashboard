// src/lib/services/authService.ts
import axios from "axios";
import axiosInstance from "../instance/axios-instance";

// Forgot Password
export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Request failed",
    };
  }
};

// Verify OTP
export const verifyOtp = async (
  payload: { otp: string },
  tokenFromURL: string,
) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", payload, {
      headers: {
        _customToken: tokenFromURL,
      },
    });

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Verification failed";
    return {
      success: false,
      message: message || "Verification failed",
    };
  }
};

// Resend Forgot OTP
export const resendForgotOtp = async (tokenFromURL: string) => {
  try {
    const response = await axiosInstance.post(
      "/auth/resend-forgot-otp",
      {},
      {
        headers: {
          _customToken: tokenFromURL,
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to resend OTP",
    };
  }
};

// Reset Password
export const resetPassword = async (
  newPassword: string,
  _repeatNewPassword: string, // Kept for backward compatibility with hook calls, but unused in body
  tokenFromURL: string,
) => {
  try {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      { newPassword },
      {
        headers: {
          _customToken: tokenFromURL,
        },
      },
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Reset password failed";
    return {
      success: false,
      message: message || "Reset password failed",
    };
  }
};
