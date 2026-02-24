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
import { Loader2, Upload, X, UserPlus } from "lucide-react";
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
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        {state.preview ? (
          <div className="relative aspect-square max-w-[150px] rounded-full overflow-hidden border-2 border-primary/20 group mx-auto">
            <Image
              src={state.preview}
              alt={label}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
            >
              <X size={24} />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center aspect-square max-w-[150px] rounded-full border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all mx-auto"
          >
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <p className="text-[10px] text-gray-500 px-2 text-center">
                Upload Photo
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
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="text-primary" />
            Add New Team Member
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-8 py-8 space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Image Column */}
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r pb-10 md:pb-0 md:pr-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
                  <span className="w-4 h-[2px] bg-primary/20"></span>
                  Photo
                </div>
                <ImageUploadField
                  label="Member Photo"
                  state={imageState}
                  setter={setImageState}
                  id="team-member-photo-upload"
                />
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-3 space-y-8">
              {/* Identity Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
                  <span className="w-8 h-[2px] bg-primary/20"></span>
                  Identity & Role
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Role <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="role"
                      placeholder="e.g. Backend Developer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
                  <span className="w-8 h-[2px] bg-primary/20"></span>
                  Biography
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Short Bio <span className="text-red-500">*</span>
                  </Label>
                  <TiptapEditor
                    value={description}
                    onChange={(val) => setDescription(val)}
                    placeholder="Tell us a bit about this member..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter className="px-8 py-6 border-t bg-gray-50/50 flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            Discard
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white min-w-[140px] h-11 font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Add Member"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
