"use client";

import React, { useState } from "react";
import { useContactUs } from "../hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, MapPin, Calendar, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { Contact } from "../../contactManagement/types/contact.types";
import ContactViewModal from "../../contactManagement/component/ContactViewModal";

export default function NewContactMessage() {
  const { data, isLoading } = useContactUs();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/60 p-8 h-full">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const messages = data?.data?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/60 p-8 h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[22px] font-bold text-gray-800 tracking-tight">
            Recent Inquiries
          </h2>
          <p className="text-[14px] font-medium text-gray-400 mt-1">
            Latest messages from contact form
          </p>
        </div>
        <Link
          href="/contact-management"
          className="group flex items-center gap-1.5 text-[13px] font-semibold text-[#1E3A5F] hover:text-blue-700 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grow overflow-x-auto">
        {messages.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Details
                </th>
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider text-center">
                  Action
                </th>
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1E3A5F] font-bold text-sm">
                        {msg.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-gray-700 leading-tight">
                          {msg.fullName}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-gray-400">
                          <Mail className="w-3 h-3" />
                          <span className="text-[12px] font-medium">
                            {msg.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[12px] font-medium truncate max-w-[150px]">
                          {msg.address}
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-400 italic truncate max-w-[200px]">
                        &quot;{msg.message.substring(0, 40)}...&quot;
                      </p>
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <button
                      onClick={() => handleViewDetails(msg)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                  <td className="py-5 text-right">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[11px] font-bold">
                        {new Date(msg.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No messages found</p>
            <p className="text-gray-400 text-sm mt-1">
              Check back later for new inquiries
            </p>
          </div>
        )}
      </div>
      <ContactViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contact={selectedContact}
      />
    </div>
  );
}
