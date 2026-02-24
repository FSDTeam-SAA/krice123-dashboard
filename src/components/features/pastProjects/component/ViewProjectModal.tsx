"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PastProject } from "../types/pastProjects.types";
import Image from "next/image";

interface ViewProjectModalProps {
  readonly project: PastProject | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-[#217337] uppercase tracking-wider border-b pb-1">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  const displayValue = value || "N/A";

  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <div className="text-sm text-gray-900">{displayValue}</div>
    </div>
  );
};

const ImageDisplay = ({ label, src }: { label: string; src: string }) => (
  <div className="space-y-2">
    <p className="text-xs text-gray-500 font-medium">{label}</p>
    <div className="relative aspect-video border rounded-lg overflow-hidden group">
      <Image
        src={src}
        alt={label}
        className="object-cover w-full h-full"
        height={200}
        width={350}
      />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium"
      >
        View Full Image
      </a>
    </div>
  </div>
);

export default function ViewProjectModal({
  project,
  isOpen,
  onClose,
}: ViewProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="p-6 border-b bg-gray-50">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Project Details: {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Project Information */}
          <InfoSection title="Project Overview">
            <InfoField label="Title" value={project.title} />
            <InfoField
              label="Created At"
              value={new Date(project.createdAt).toLocaleDateString()}
            />
          </InfoSection>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#217337] uppercase tracking-wider border-b pb-1">
              Description
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap">
              {project.description}
            </div>
          </div>

          {/* Project Images */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#217337] uppercase tracking-wider border-b pb-1">
              Project Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ImageDisplay label="Past Image" src={project.pastImage} />
              <ImageDisplay label="Remodel Image" src={project.remodelImage} />
              <ImageDisplay
                label="Thumbnail Image"
                src={project.thumbnailImage}
              />
            </div>
          </div>

          {/* Metadata */}
          <InfoSection title="Submission Details">
            <InfoField
              label="Created At"
              value={new Date(project.createdAt).toLocaleString()}
            />
            <InfoField
              label="Last Updated"
              value={new Date(project.updatedAt).toLocaleString()}
            />
          </InfoSection>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all font-medium text-sm cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
