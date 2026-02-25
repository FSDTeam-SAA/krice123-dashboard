"use client";

import React, { useState } from "react";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGetProfileInfo, useUpdateProfileInfo } from "../hook/useSetting";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Profile() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const { data: profileInfo } = useGetProfileInfo(userId || "");
  const { mutate: updateProfile, isPending } = useUpdateProfileInfo(
    userId || "",
  );

  const profileData = profileInfo?.success ? profileInfo.data : null;

  // Derived display values: user's in-progress edits take priority over fetched data
  const displayValues = {
    firstName: isEditing ? formData.firstName : profileData?.firstName || "",
    lastName: isEditing ? formData.lastName : profileData?.lastName || "",
    email: profileData?.email || "",
  };

  const fullName =
    `${profileData?.firstName || ""} ${profileData?.lastName || ""}`.trim() ||
    "—";

  // Enter edit mode: pre-fill formData with current profile values
  const handleEditClick = () => {
    setFormData({
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
    });
    setErrors({ firstName: "", lastName: "" });
    setIsEditing(true);
  };

  // Exit edit mode without saving
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({ firstName: "", lastName: "" });
  };

  // Validate fields
  const validate = () => {
    const newErrors = { firstName: "", lastName: "" };
    let valid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Save handler
  const handleSave = () => {
    if (!validate()) return;

    updateProfile(
      {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully.");
          setIsEditing(false);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || "Failed to update profile.";
          toast.error(message);
        },
      },
    );
  };

  // Shared read-only input classes
  const readOnlyClass =
    "h-12 border-gray-200 rounded-md bg-gray-50 text-gray-700 font-medium cursor-default select-none";
  // Shared editable input classes
  const editableClass =
    "h-12 border-gray-300 focus-visible:ring-primary/20 focus-visible:border-primary rounded-md bg-white text-gray-900 font-medium transition-colors";

  return (
    <div className="p-6 space-y-8 bg-white min-h-screen">
      {/* Header Section */}
      <HeaderTitle title="Setting" subtitle="Dashboard > Setting" />

      {/* Avatar & Action Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Profile Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
            <p className="text-sm text-gray-400">{displayValues.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isPending}
                className="flex items-center gap-2 h-11 px-5 font-semibold rounded-lg border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
              >
                <X size={16} />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isPending}
                className="bg-[#6A994E] hover:bg-[#5a8342] text-white flex items-center gap-2 h-11 px-6 font-semibold rounded-lg shadow-sm transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEditClick}
              className="bg-[#6A994E] hover:bg-[#5a8342] text-white flex items-center gap-2 h-11 px-6 font-semibold rounded-lg shadow-sm transition-all transform active:scale-95"
            >
              <Pencil size={16} />
              Update Profile
            </Button>
          )}
        </div>
      </div>

      {/* Edit mode banner */}
      {isEditing && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 font-medium">
          ✏️ You are in edit mode. Make your changes and click{" "}
          <span className="font-semibold">Save Changes</span> to update your
          profile.
        </div>
      )}

      {/* Form Section */}
      <div className="space-y-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-400">
              First Name
            </Label>
            <Input
              value={displayValues.firstName}
              readOnly={!isEditing}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                if (errors.firstName)
                  setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              className={isEditing ? editableClass : readOnlyClass}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-400">
              Last Name
            </Label>
            <Input
              value={displayValues.lastName}
              readOnly={!isEditing}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                if (errors.lastName)
                  setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              className={isEditing ? editableClass : readOnlyClass}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email — always read-only */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-400">
            Email Address
          </Label>
          <Input
            value={displayValues.email}
            readOnly
            disabled
            className="h-12 border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary rounded-md bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
          />
          <p className="text-xs text-gray-400">
            Email address cannot be changed.
          </p>
        </div>
      </div>
    </div>
  );
}
