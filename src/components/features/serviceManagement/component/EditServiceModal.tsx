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

import { useUpdateService } from "../hooks/useServiceManagement";
import { toast } from "sonner";
import { Loader2, Upload, X, Pencil } from "lucide-react";
import Image from "next/image";
import { ServiceManagement } from "../types/serviceManagement.types";

interface EditServiceModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly service: ServiceManagement | null;
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
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {state.preview ? (
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary/20 group">
            <Image
              src={state.preview}
              alt={label}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center justify-center py-4 text-center px-4">
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <p className="text-[10px] text-gray-500 font-medium">
                Click to update {label.toLowerCase()}
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

export default function EditServiceModal({
  isOpen,
  onClose,
  service,
}: EditServiceModalProps) {
  const [title, setTitle] = useState(service?.title ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: service?.image ?? "",
    isExisting: !!service,
  });

  const { mutate: updateServiceMutation, isPending } = useUpdateService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (imageState.file) {
      formData.append("image", imageState.file);
    }

    updateServiceMutation(
      { id: service._id, formData },
      {
        onSuccess: () => {
          toast.success("Service updated successfully!");
          onClose();
        },
        onError: (error) => {
          let errorMessage = "Failed to update service. Please try again.";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          toast.error(errorMessage);
        },
      },
    );
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="px-8 py-6 border-b bg-gray-50/50">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Pencil className="text-primary" size={20} />
            Edit Service
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-8 py-8 space-y-10"
        >
          {/* Title Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-primary/20"></span>
              Service Identity
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-title"
                className="text-sm font-semibold text-gray-700"
              >
                Service Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-title"
                placeholder="Enter service title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 focus-visible:ring-primary/20 focus-visible:border-primary border-gray-200"
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-primary/20"></span>
              Service Description
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-description"
                className="text-sm font-semibold text-gray-700"
              >
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <TiptapEditor
                value={description}
                onChange={(val) => setDescription(val)}
                placeholder="Update the details of this service..."
              />
            </div>
          </div>

          {/* Image Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-primary/20"></span>
              Visual Showcase
            </div>
            <div className="max-w-md">
              <ImageUploadField
                label="Service Image"
                state={imageState}
                setter={setImageState}
                id="edit-service-image-upload"
              />
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
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
