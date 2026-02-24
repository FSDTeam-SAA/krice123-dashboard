"use client";

import React, { useState } from "react";
import { useProjects } from "../hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Image as ImageIcon, Calendar, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PastProject } from "../../pastProjects/types/pastProjects.types";
import ViewProjectModal from "../../pastProjects/component/ViewProjectModal";

export default function RecentPastProjects() {
  const { data, isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<PastProject | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: PastProject) => {
    setSelectedProject(project);
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
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const projects = data?.data?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/60 p-8 h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[22px] font-bold text-gray-800 tracking-tight">
            Recent Projects
          </h2>
          <p className="text-[14px] font-medium text-gray-400 mt-1">
            Latest additions to past works
          </p>
        </div>
        <Link
          href="/past-projects"
          className="group flex items-center gap-1.5 text-[13px] font-semibold text-[#1E3A5F] hover:text-blue-700 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grow overflow-x-auto">
        {projects.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Created
                </th>
                <th className="pb-4 text-[13px] font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        {project.thumbnailImage ? (
                          <Image
                            src={project.thumbnailImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-gray-700 leading-tight group-hover:text-[#1E3A5F] transition-colors">
                          {project.title}
                        </p>
                        <p className="text-[12px] text-gray-400 mt-1 line-clamp-1 max-w-[200px]">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[12px] font-medium">
                        {new Date(project.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 text-right">
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No projects found</p>
            <p className="text-gray-400 text-sm mt-1">
              Start by adding your first project
            </p>
          </div>
        )}
      </div>
      <ViewProjectModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        project={selectedProject}
      />
    </div>
  );
}
