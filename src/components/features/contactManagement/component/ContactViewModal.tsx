"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "../types/contact.types";

interface ContactViewModalProps {
  readonly contact: Contact | null;
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

export default function ContactViewModal({
  contact,
  isOpen,
  onClose,
}: ContactViewModalProps) {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white">
        <DialogHeader className="p-6 border-b bg-gray-50">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Contact Details: {contact.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Personal Information */}
          <InfoSection title="Contact Information">
            <InfoField label="Full Name" value={contact.fullName} />
            <InfoField label="Email" value={contact.email} />
            <InfoField label="Phone Number" value={contact.phoneNumber} />
            <InfoField label="Address" value={contact.address} />
          </InfoSection>

          {/* Message Content */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#217337] uppercase tracking-wider border-b pb-1">
              Message
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap">
              {contact.message}
            </div>
          </div>

          {/* Metadata */}
          <InfoSection title="Submission Details">
            <InfoField
              label="Submitted At"
              value={new Date(contact.createdAt).toLocaleString()}
            />
            <InfoField
              label="Last Updated"
              value={new Date(contact.updatedAt).toLocaleString()}
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
