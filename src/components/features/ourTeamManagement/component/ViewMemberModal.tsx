"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamMember } from "../types/ourTeamManagement.types";
import Image from "next/image";

interface ViewMemberModalProps {
  readonly member: TeamMember | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const ImageDisplay = ({ label, src }: { label: string; src: string }) => (
  <div className="space-y-2">
    <p className="text-xs text-gray-500 font-medium">{label}</p>
    <div className="relative aspect-square max-w-[200px] border rounded-full overflow-hidden group mx-auto">
      <Image
        src={src}
        alt={label}
        className="object-cover w-full h-full"
        height={200}
        width={200}
      />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium"
      >
        View Photo
      </a>
    </div>
  </div>
);

export default function ViewMemberModal({
  member,
  isOpen,
  onClose,
}: ViewMemberModalProps) {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="px-8 py-6 border-b bg-gray-50/50">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Team Member Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/3 flex justify-center">
              <ImageDisplay label="Profile Photo" src={member.image} />
            </div>

            <div className="flex-1 space-y-6">
              {/* Header Section: Name & Role */}
              <div className="space-y-2 border-b pb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
                  {member.name}
                </h2>
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                  {member.role}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span>Joined on</span>
                  <time className="text-gray-700">
                    {new Date(member.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary/20"></span>
                  Member Bio
                </h3>
                <div
                  className="prose prose-sm sm:prose-base prose-primary max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: member.description }}
                />
              </div>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="pt-10 border-t flex flex-wrap gap-x-10 gap-y-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">
                Reference ID
              </p>
              <code className="text-xs text-gray-500 font-mono">
                {member._id}
              </code>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">
                Last Updated
              </p>
              <p className="text-xs text-gray-500">
                {new Date(member.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-semibold text-sm shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            Close Profile
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
