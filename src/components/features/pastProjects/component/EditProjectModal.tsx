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

import { useUpdatePastProject } from "../hooks/usePastProjects";
import { toast } from "sonner";
import { Loader2, Upload, X, Pencil } from "lucide-react";
import Image from "next/image";
import { PastProject } from "../types/pastProjects.types";

interface EditProjectModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly project: PastProject | null;
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

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
}: EditProjectModalProps) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");

  const [thumbnailImage, setThumbnailImage] = useState<ImageState>({
    file: null,
    preview: project?.thumbnailImage ?? "",
    isExisting: !!project,
  });
  const [remodelImage, setRemodelImage] = useState<ImageState>({
    file: null,
    preview: project?.remodelImage ?? "",
    isExisting: !!project,
  });
  const [pastImage, setPastImage] = useState<ImageState>({
    file: null,
    preview: project?.pastImage ?? "",
    isExisting: !!project,
  });

  const { mutate: updateProject, isPending } = useUpdatePastProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!project) return;

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (thumbnailImage.file) {
      formData.append("thumbnailImage", thumbnailImage.file);
    }
    if (remodelImage.file) {
      formData.append("remodelImage", remodelImage.file);
    }
    if (pastImage.file) {
      formData.append("pastImage", pastImage.file);
    }

    updateProject(
      { id: project._id, formData },
      {
        onSuccess: () => {
          toast.success("Project updated successfully!");
          onClose();
        },
        onError: (error) => {
          let errorMessage = "Failed to update project. Please try again.";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          toast.error(errorMessage);
        },
      },
    );
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="px-8 py-6 border-b bg-gray-50/50">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Pencil className="text-primary" size={20} />
            Edit Past Project
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
              Project Identity
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-title"
                className="text-sm font-semibold text-gray-700"
              >
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-title"
                placeholder="Enter project title"
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
              Project Story
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
                placeholder="Share the story of this project..."
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-primary/20"></span>
              Visual Showcase
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImageUploadField
                label="Past State"
                state={pastImage}
                setter={setPastImage}
                id="edit-past-upload"
              />
              <ImageUploadField
                label="Remodeled View"
                state={remodelImage}
                setter={setRemodelImage}
                id="edit-remodel-upload"
              />
              <ImageUploadField
                label="Thumbnail"
                state={thumbnailImage}
                setter={setThumbnailImage}
                id="edit-thumbnail-upload"
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
