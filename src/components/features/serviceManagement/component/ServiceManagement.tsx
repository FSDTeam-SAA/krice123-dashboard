"use client";

import React, { useState } from "react";
import {
  useServiceManagement,
  useDeleteService,
} from "../hooks/useServiceManagement";
import HeaderTitle from "@/components/shared/HeaderTitle";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Pencil,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ViewServiceModal from "./ViewServiceModal";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { ServiceManagement as ServiceType } from "../types/serviceManagement.types";
import { toast } from "sonner";
import Image from "next/image";

export default function ServiceManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useServiceManagement(page, limit);

  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Delete state
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteServiceMutation, isPending: isDeleting } =
    useDeleteService();

  const handleViewDetails = (service: ServiceType) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (service: ServiceType) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
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
    setServiceToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!serviceToDelete) return;

    deleteServiceMutation(serviceToDelete, {
      onSuccess: () => {
        toast.success("Service deleted successfully!");
        setIsDeleteModalOpen(false);
        setServiceToDelete(null);
      },
      onError: (error) => {
        let errorMessage = "Failed to delete service. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <HeaderTitle
          title="Service Management"
          subtitle="Dashboard > Service Management"
        />
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 cursor-pointer"
        >
          <Plus size={18} />
          Add New Service
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Thumbnail
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">
                  Created Date
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={`service-table-skeleton-${idx}`}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-12 w-20 rounded-md" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-60" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Skeleton className="h-8 w-16 rounded-md mx-auto" />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {data?.data.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No services found.
                      </td>
                    </tr>
                  ) : (
                    data?.data.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="relative h-12 w-20 rounded-md overflow-hidden border border-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-[300px]">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                item.description
                                  ?.replace(/<[^>]+>/g, "")
                                  .split(" ")
                                  .slice(0, 10)
                                  .join(" ") + "...",
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(item)}
                            className="p-2 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-white transition-all inline-flex items-center justify-center cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-2 bg-blue-500/10 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all inline-flex items-center justify-center cursor-pointer"
                            title="Edit Service"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item._id)}
                            className="p-2 bg-red-500/10 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all inline-flex items-center justify-center cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 size={18} />
                          </button>
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

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {isEditModalOpen && selectedService && (
        <EditServiceModal
          key={selectedService._id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          service={selectedService}
        />
      )}

      <ViewServiceModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        service={selectedService}
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
