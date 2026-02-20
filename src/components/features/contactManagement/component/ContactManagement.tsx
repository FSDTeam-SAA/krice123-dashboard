"use client";

import React, { useState } from "react";
import {
  useContactManagement,
  useDeleteContactManagement,
} from "../hooks/useContactManagement";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ContactViewModal from "./ContactViewModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Contact } from "../types/contact.types";
import { toast } from "sonner";

export default function ContactManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useContactManagement(page, limit);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete state
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteContact, isPending: isDeleting } =
    useDeleteContactManagement();

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  const handlePageChange = (newPage: number) => {
    if (data?.meta && newPage >= 1 && newPage <= data.meta.totalPages) {
      setPage(newPage);
    }
  };

  // delete handlers
  const handleDeleteClick = (id: string) => {
    setContactToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!contactToDelete) return;

    deleteContact(contactToDelete, {
      onSuccess: () => {
        toast.success("Contact deleted successfully!");
        setIsDeleteModalOpen(false);
        setContactToDelete(null);
      },
      onError: (error) => {
        let errorMessage = "Failed to delete contact. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <HeaderTitle
        title="Contact Managements"
        subtitle="Dashboard > Contact Managements"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Address
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={`contact-skeleton-${idx}`}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-10 w-40" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Skeleton className="h-8 w-8 rounded-md mx-auto" />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {data?.data.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No contact entries found.
                      </td>
                    </tr>
                  ) : (
                    data?.data.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {item.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {item.fullName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.phoneNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]">
                          {item.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="p-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all inline-flex items-center justify-center cursor-pointer"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(item._id)}
                              className="p-2 bg-red-500 text-white rounded-md hover:bg-opacity-90 transition-all inline-flex items-center justify-center cursor-pointer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {data?.meta &&
          (() => {
            const meta = data.meta;
            return (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                <div className="text-sm text-gray-500 font-medium">
                  Showing {data?.data.length ? (page - 1) * limit + 1 : 0} to{" "}
                  {Math.min(page * limit, meta.totalItems || 0)} of{" "}
                  {meta.totalItems || 0} results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {meta.totalPages > 0 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors ${
                          page === 1
                            ? "bg-primary text-white"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        1
                      </button>

                      {meta.totalPages > 1 && (
                        <>
                          {meta.totalPages > 3 && page > 2 && (
                            <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
                              ...
                            </span>
                          )}

                          {page > 1 && page < meta.totalPages && (
                            <button className="w-8 h-8 flex items-center justify-center text-sm bg-primary text-white rounded">
                              {page}
                            </button>
                          )}

                          {meta.totalPages > 3 &&
                            page < meta.totalPages - 1 && (
                              <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
                                ...
                              </span>
                            )}

                          <button
                            onClick={() => handlePageChange(meta.totalPages)}
                            className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors ${
                              page === meta.totalPages && meta.totalPages !== 1
                                ? "bg-primary text-white"
                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {meta.totalPages}
                          </button>
                        </>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === (meta.totalPages || 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })()}
      </div>

      <ContactViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contact={selectedContact}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}
