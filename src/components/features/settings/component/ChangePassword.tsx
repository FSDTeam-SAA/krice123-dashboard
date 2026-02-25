"use client";
import React, { useState } from "react";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save, X, Loader2 } from "lucide-react";
import { useChangePassword } from "../hook/useSetting";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function ChangePassword() {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: changePasswordMutation, isPending } = useChangePassword();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    const payload = {
      currentPassword,
      newPassword,
    };

    changePasswordMutation(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to change password. Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-6 space-y-8 bg-white h-screen">
      {/* Header Section */}
      <HeaderTitle title="Setting" subtitle="Dashboard > Setting" />

      {/* Change Password Card */}
      <form
        onSubmit={handleSave}
        className="bg-[#f8faf7] border border-[#d8ead3] rounded-2xl p-8 space-y-8 shadow-sm mx-auto container"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
          <p className="text-xs text-gray-500 italic">
            Secure your account with a strong password.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Password
            </Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isPending}
                className="h-12 bg-white border-gray-200 pr-10 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg text-gray-700 font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              New Password
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isPending}
                className="h-12 bg-white border-gray-200 pr-10 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg text-gray-700 font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isPending}
                className="h-12 bg-white border-gray-200 pr-10 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg text-gray-700 font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
            className="border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 h-11 px-8 font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <X size={18} />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-[#6A994E] hover:bg-[#5a8342] text-white flex items-center gap-2 h-11 px-8 font-semibold rounded-lg shadow-sm transition-all transform active:scale-95 cursor-pointer min-w-[140px]"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
