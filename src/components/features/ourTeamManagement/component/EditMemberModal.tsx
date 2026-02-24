"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TiptapEditor from "@/components/shared/TiptapEditor";

import { useUpdateTeamMember } from "../hook/useOurTeamManagement";
import { toast } from "sonner";
import {
  Loader2,
  Upload,
  X,
  Pencil,
  User,
  Briefcase,
  Type,
  ImageIcon,
  History,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { TeamMember } from "../types/ourTeamManagement.types";

interface EditMemberModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly member: TeamMember | null;
}

interface ImageState {
  file: File | null;
  preview: string;
  isExisting?: boolean;
}

const ImageUploadField = ({
  label,
  state,
  setter,
  id,
}: {
  label: string;
  state: ImageState;
  setter: React.Dispatch<React.SetStateAction<ImageState>>;
  id: string;
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setter({ file, preview, isExisting: false });
    }
  };

  const removeImage = () => {
    setter({ file: null, preview: "", isExisting: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="text-sm font-bold text-gray-700 flex items-center gap-2"
        >
          <ImageIcon size={16} className="text-primary/60" />
          {label}
        </Label>
        {state.preview && (
          <div
            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 ${
              state.isExisting
                ? "bg-gray-100 text-gray-400"
                : "bg-green-100 text-green-600 animate-pulse"
            }`}
          >
            {state.isExisting ? (
              <>
                <History size={10} /> Current
              </>
            ) : (
              <>
                <Sparkles size={10} /> New Selection
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="relative group/upload w-full max-w-sm">
          {state.preview ? (
            <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100 group transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={state.preview}
                alt={label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Remove photo"
                >
                  <X size={24} />
                </button>
                <p className="text-xs text-white font-bold uppercase tracking-wider">
                  Replace Photo
                </p>
              </div>
            </div>
          ) : (
            <label
              htmlFor={id}
              className="flex flex-col items-center justify-center aspect-4/3 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all duration-300 group/label"
            >
              <span className="sr-only">Upload profile photo</span>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover/label:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-primary/60" />
                </div>
                <p className="text-base font-semibold text-gray-700 mb-2">
                  Change Photo
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  Click to browse files
                </p>
              </div>
              <input
                id={id}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EditMemberModal({
  isOpen,
  onClose,
  member,
}: EditMemberModalProps) {
  const [name, setName] = useState(member?.name ?? "");
  const [role, setRole] = useState(member?.role ?? "");
  const [description, setDescription] = useState(member?.description ?? "");
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: member?.image ?? "",
    isExisting: !!member,
  });

  const { mutate: updateMemberMutation, isPending } = useUpdateTeamMember();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!member) return;

    if (!name || !role || !description) {
      toast.error("Name, role and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("description", description);

    if (imageState.file) {
      formData.append("image", imageState.file);
    }

    updateMemberMutation(
      { id: member._id, formData },
      {
        onSuccess: () => {
          toast.success("Team member updated successfully!");
          onClose();
        },
        onError: (error) => {
          let errorMessage = "Failed to update member. Please try again.";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          toast.error(errorMessage);
        },
      },
    );
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-white border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10 flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Pencil size={22} />
              </div>
              Edit Profile
            </DialogTitle>
            <p className="text-sm text-gray-500 ml-[52px]">
              Update member details and professional information.
            </p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8 space-y-10">
            {/* Image Section */}
            <ImageUploadField
              label="Profile Photo"
              state={imageState}
              setter={setImageState}
              id="edit-team-member-photo-upload"
            />

            {/* Form Fields */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-name"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User size={16} className="text-gray-400" />
                    Full Name
                  </Label>
                  <Input
                    id="edit-name"
                    placeholder="e.g. Alexander Pierce"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200 rounded-xl bg-white shadow-sm transition-all text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="edit-role"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Briefcase size={16} className="text-gray-400" />
                    Professional Role
                  </Label>
                  <Input
                    id="edit-role"
                    placeholder="e.g. Senior Backend Architect"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200 rounded-xl bg-white shadow-sm transition-all text-base"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label
                  htmlFor="edit-description"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Type size={16} className="text-gray-400" />
                  Short Bio
                </Label>
                <div className="rounded-xl overflow-hidden border border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all bg-white shadow-sm">
                  <TiptapEditor
                    value={description}
                    onChange={(val) => setDescription(val)}
                    placeholder="Update the member biography details..."
                  />
                </div>
              </div>
            </div>

            {/* Last Activity Section at the bottom */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50">
              <h4 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <History size={14} /> Last Activity
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                    Created On
                  </p>
                  <p className="text-sm text-gray-700 font-semibold">
                    {new Date(member.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                    Last Updated
                  </p>
                  <p className="text-sm text-gray-700 font-semibold">
                    {new Date(member.updatedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="px-8 py-6 border-t bg-gray-50/80 backdrop-blur-sm flex items-center justify-end gap-3 sticky bottom-0 z-10 w-full">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-11 px-6 font-medium rounded-xl transition-all border cursor-pointer"
          >
            Discard Changes
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white min-w-[160px] h-11 font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
             
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
