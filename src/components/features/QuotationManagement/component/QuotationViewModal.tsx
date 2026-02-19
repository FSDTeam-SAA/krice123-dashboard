"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quotation } from "../types/quotation.types";
import Image from "next/image";

interface QuotationViewModalProps {
  quotation: Quotation | null;
  isOpen: boolean;
  onClose: () => void;
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
  value: string | boolean | number | undefined;
}) => {
  let displayValue: string | number;

  if (typeof value === "boolean") {
    displayValue = value ? "Yes" : "No";
  } else if (value === undefined || value === null || value === "") {
    displayValue = "N/A";
  } else {
    displayValue = value;
  }

  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <div className="text-sm text-gray-900">{displayValue}</div>
    </div>
  );
};

export default function QuotationViewModal({
  quotation,
  isOpen,
  onClose,
}: QuotationViewModalProps) {
  if (!quotation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="p-6 border-b bg-gray-50">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Quotation Details: {quotation.firstName} {quotation.lastName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Personal Information */}
          <InfoSection title="Personal Information">
            <InfoField
              label="Full Name"
              value={`${quotation.firstName} ${quotation.lastName}`}
            />
            <InfoField label="Email" value={quotation.email} />
            <InfoField label="Phone Number" value={quotation.phoneNumber} />
            <InfoField
              label="Spouse Name"
              value={
                quotation.spouseFirstName
                  ? `${quotation.spouseFirstName} ${quotation.spouseLastName}`
                  : "N/A"
              }
            />
          </InfoSection>

          {/* Location & Ownership */}
          <InfoSection title="Location & Ownership">
            <InfoField label="Street Address" value={quotation.streetAddress} />
            <InfoField
              label="Address Line 2"
              value={quotation.streetAddressLine2}
            />
            <InfoField
              label="City, State, Zip"
              value={`${quotation.city}, ${quotation.stateOrProvince} ${quotation.postalOrZipCode}`}
            />
            <InfoField label="Legal Owner" value={quotation.isLegalOwner} />
            <InfoField
              label="Site Address (if different)"
              value={quotation.siteAddressIfDifferent}
            />
          </InfoSection>

          {/* Project Details */}
          <InfoSection title="Project Details">
            <InfoField label="Work Type" value={quotation.workType} />
            <InfoField label="Budget" value={quotation.budget} />
            <InfoField
              label="Desired Start Time"
              value={quotation.desiredStartTime}
            />
            <InfoField
              label="Has Selected Architect?"
              value={quotation.haveSelected}
            />
            <InfoField label="Has Financing?" value={quotation.hasFinancing} />
            <InfoField
              label="Site Ready?"
              value={quotation.isSiteReadyToWorkOn}
            />
          </InfoSection>

          {/* Requirements & Expectations */}
          <InfoSection title="Requirements & Expectations">
            <InfoField
              label="Pre-Build Requirements"
              value={quotation.preBuildRequirements}
            />
            <InfoField
              label="Special Requirements"
              value={quotation.specialRequirements}
            />
            <InfoField
              label="Builder Expectations"
              value={quotation.builderExpectations}
            />
            <InfoField
              label="Experience Help Needed"
              value={quotation.expectationsExperienceHelp}
            />
            <InfoField
              label="How did they hear about us?"
              value={quotation.hearAboutUs}
            />
          </InfoSection>

          {/* Priorities */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b pb-1">
              Priorities (1-5)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <InfoField
                label="Communication"
                value={quotation.priorities.communication}
              />
              <InfoField
                label="Reliability"
                value={quotation.priorities.reliability}
              />
              <InfoField
                label="Experience"
                value={quotation.priorities.experience}
              />
              <InfoField label="Quality" value={quotation.priorities.quality} />
              <InfoField label="Cost" value={quotation.priorities.cost} />
            </div>
          </div>

          {/* Plan Files */}
          {quotation.planFiles && quotation.planFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#217337] uppercase tracking-wider border-b pb-1">
                Plan Files / Attachments
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quotation.planFiles.map((file, index) => (
                  <div
                    key={`plan-file-${file}-${index}`}
                    className="relative aspect-square border rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={file}
                      alt={`Plan File ${index + 1}`}
                      className="object-cover w-full h-full"
                      height={100}
                      width={100}
                    />
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium"
                    >
                      View Full Image
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
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
