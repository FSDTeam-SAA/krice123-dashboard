"use client";

import React, { useState } from "react";
import { useQuotationManagement } from "../hooks/useQuotationManagement";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import QuotationViewModal from "./QuotationViewModal";
import { Quotation } from "../types/quotation.types";

export default function QuotationManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useQuotationManagement(page, limit);

  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsModalOpen(true);
  };

  console.log(data);

  const formatData = (dateString: string) => {
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

  return (
    <div className="p-6 space-y-6">
      <HeaderTitle
        title="Quotation Managements"
        subtitle="Dashboard > Quotation Managements"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  User Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  City
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
                  <tr key={`quotation-skeleton-${idx}`}>
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
                        No quotations found.
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
                              <AvatarImage
                                // src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.firstName}`}
                                src={item.planFiles[0]}
                              />
                              <AvatarFallback>
                                {item.firstName[0]}
                                {item.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {item.firstName} {item.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.phoneNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.city}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          {formatData(item.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleViewDetails(item)}
                            className="p-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all inline-flex items-center justify-center cursor-pointer"
                          >
                            <Eye size={18} />
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
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <div className="text-sm text-gray-500 font-medium">
            Showing {data?.data.length ? (page - 1) * limit + 1 : 0} to{" "}
            {Math.min(page * limit, data?.meta.totalItems || 0)} of{" "}
            {data?.meta.totalItems || 0} results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            {data?.meta.totalPages && data.meta.totalPages > 0 && (
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

                {data.meta.totalPages > 1 && (
                  <>
                    {data.meta.totalPages > 3 && page > 2 && (
                      <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
                        ...
                      </span>
                    )}

                    {page > 1 && page < data.meta.totalPages && (
                      <button className="w-8 h-8 flex items-center justify-center text-sm bg-primary text-white rounded">
                        {page}
                      </button>
                    )}

                    {data.meta.totalPages > 3 &&
                      page < data.meta.totalPages - 1 && (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
                          ...
                        </span>
                      )}

                    <button
                      onClick={() => handlePageChange(data.meta.totalPages)}
                      className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors ${
                        page === data.meta.totalPages &&
                        data.meta.totalPages !== 1
                          ? "bg-primary text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {data.meta.totalPages}
                    </button>
                  </>
                )}
              </>
            )}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === (data?.meta.totalPages || 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <QuotationViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quotation={selectedQuotation}
      />
    </div>
  );
}
