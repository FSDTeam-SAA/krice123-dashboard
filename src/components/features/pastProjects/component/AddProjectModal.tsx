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
import { Textarea } from "@/components/ui/textarea";

import { useCreatePastProject } from "../hooks/usePastProjects";
import { toast } from "sonner";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface AddProjectModalProps {
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
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
          >
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-xs text-gray-500">
                Click to upload {label.toLowerCase()}
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

export default function AddProjectModal({
  isOpen,
  onClose,
}: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnailImage, setThumbnailImage] = useState<ImageState>({
    file: null,
    preview: "",
  });
  const [remodelImage, setRemodelImage] = useState<ImageState>({
    file: null,
    preview: "",
  });
  const [pastImage, setPastImage] = useState<ImageState>({
    file: null,
    preview: "",
  });

  const { mutate: createProject, isPending } = useCreatePastProject();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setThumbnailImage({ file: null, preview: "" });
    setRemodelImage({ file: null, preview: "" });
    setPastImage({ file: null, preview: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !thumbnailImage.file ||
      !remodelImage.file ||
      !pastImage.file
    ) {
      toast.error("Please fill in all fields and upload all images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnailImage", thumbnailImage.file);
    formData.append("remodelImage", remodelImage.file);
    formData.append("pastImage", pastImage.file);

    createProject(formData, {
      onSuccess: () => {
        toast.success("Project created successfully!");
        onClose();
        resetForm();
      },
      onError: (error) => {
        let errorMessage = "Failed to create project. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ImageIcon className="text-primary" />
            Add New Past Project
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px] focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-6">
              <ImageUploadField
                label="Thumbnail Image"
                state={thumbnailImage}
                setter={setThumbnailImage}
                id="thumbnail-upload"
              />
              <ImageUploadField
                label="Remodel Image"
                state={remodelImage}
                setter={setRemodelImage}
                id="remodel-upload"
              />
              <ImageUploadField
                label="Past Image"
                state={pastImage}
                setter={setPastImage}
                id="past-upload"
              />
            </div>
          </div>
        </form>

        <DialogFooter className="p-6 border-t bg-gray-50 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="border-gray-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Add Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
