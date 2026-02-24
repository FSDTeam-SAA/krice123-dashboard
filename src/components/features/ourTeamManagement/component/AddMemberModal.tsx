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

import { useCreateTeamMember } from "../hook/useOurTeamManagement";
import { toast } from "sonner";
import {
  Loader2,
  Upload,
  X,
  UserPlus,
  User,
  Briefcase,
  Type,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";

interface AddMemberModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

interface ImageState {
  file: File | null;
  preview: string;
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
      setter({ file, preview });
    }
  };

  const removeImage = () => {
    setter({ file: null, preview: "" });
  };

  return (
    <div className="space-y-3">
      <Label
        htmlFor={id}
        className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"
      >
        <ImageIcon size={14} className="text-primary/60" />
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className="relative group/upload">
        {state.preview ? (
          <div className="relative aspect-square max-w-[180px] rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100 group mx-auto transition-transform duration-300 hover:scale-105">
            <Image
              src={state.preview}
              alt={label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={removeImage}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                title="Remove photo"
              >
                <X size={20} />
              </button>
              <p className="text-[10px] text-white font-bold uppercase tracking-tight">
                Remove Photo
              </p>
            </div>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center aspect-square max-w-[180px] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all duration-300 mx-auto group/label"
          >
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover/label:scale-110 transition-transform duration-300">
                <Upload className="h-6 w-6 text-primary/60" />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Upload Photo
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                JPG, PNG or WebP
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
  );
};

export default function AddMemberModal({
  isOpen,
  onClose,
}: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: "",
  });

  const { mutate: createMemberMutation, isPending } = useCreateTeamMember();

  const resetForm = () => {
    setName("");
    setRole("");
    setDescription("");
    setImageState({ file: null, preview: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !role || !description || !imageState.file) {
      toast.error("Please fill in all fields and upload a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("description", description);
    formData.append("image", imageState.file);

    createMemberMutation(formData, {
      onSuccess: () => {
        toast.success("Team member added successfully!");
        onClose();
        resetForm();
      },
      onError: (error) => {
        let errorMessage = "Failed to add team member. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-white border-none shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10 flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <UserPlus size={22} />
              </div>
              Add Team Member
            </DialogTitle>
            <p className="text-sm text-gray-500 ml-13">
              Expand your team with a new professional profile.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 h-full">
            {/* Sidebar Column */}
            <div className="md:col-span-4 bg-gray-50/50 p-8 border-r border-gray-100">
              <div className="sticky top-0">
                <ImageUploadField
                  label="Profile Photo"
                  state={imageState}
                  setter={setImageState}
                  id="team-member-photo-upload"
                />

                <div className="mt-10 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                    Display Tip
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "A high-quality 1:1 ratio headshot works best for member
                    profiles."
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form Column */}
            <div className="md:col-span-8 p-8 space-y-10">
              {/* Identity Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Identity & Expertise
                  </span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <User size={16} className="text-gray-400" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Alexander Pierce"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200 rounded-xl bg-white shadow-sm transition-all"
                    />
                    <p className="text-[10px] text-gray-400">
                      First and last name preferred.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Briefcase size={16} className="text-gray-400" />
                      Professional Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="e.g. Senior Backend Architect"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200 rounded-xl bg-white shadow-sm transition-all"
                    />
                    <p className="text-[10px] text-gray-400">
                      Main designation within the company.
                    </p>
                  </div>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Professional Biography
                  </span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="space-y-2 group/biography">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Type size={16} className="text-gray-400" />
                    Short Bio
                  </Label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all bg-white shadow-sm">
                    <TiptapEditor
                      value={description}
                      onChange={(val) => setDescription(val)}
                      placeholder="Share a brief overview of professional experience and achievements..."
                    />
                  </div>
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
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-11 px-6 font-medium rounded-xl transition-all"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white min-w-[160px] h-11 font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Working...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Create Profile
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
