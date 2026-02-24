"use client";

import React, { useState } from "react";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save, X } from "lucide-react";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="p-6 space-y-8 bg-white min-h-screen">
      {/* Header Section */}
      <HeaderTitle title="Setting" subtitle="Dashboard > Setting" />

      {/* Change Password Card */}
      <div className="bg-[#f8faf7] border border-[#d8ead3] rounded-2xl p-8 space-y-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800">Change Password</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-400">
              Current Password
            </Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                defaultValue="**********"
                className="h-12 bg-[#f0f4ef] border-gray-200 pr-10 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg text-gray-700 font-medium"
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
            <Label className="text-xs font-medium text-gray-400">
              New Password
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                defaultValue="**********"
                className="h-12 bg-[#f0f4ef] border-gray-200 pr-10 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg text-gray-700 font-medium"
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
            <Label className="text-xs font-medium text-gray-400">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                defaultValue="**********"
                className="h-12 bg-[#f0f4ef] border-gray-200 pr-10 focus-visible:ring-primary/20 focus-visible:border-primary rounded-lg text-gray-700 font-medium"
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
            variant="outline"
            className="border-[#f0c3c3] text-[#d93025] hover:bg-red-50 hover:text-[#d93025] flex items-center gap-2 h-11 px-8 font-semibold rounded-lg shadow-sm transition-all"
          >
            <X size={18} />
            Cancel
          </Button>
          <Button className="bg-[#6A994E] hover:bg-[#5a8342] text-white flex items-center gap-2 h-11 px-8 font-semibold rounded-lg shadow-sm transition-all transform active:scale-95">
            <Save size={18} />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
