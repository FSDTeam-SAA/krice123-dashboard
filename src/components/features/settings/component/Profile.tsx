"use client";

import React, { useState } from "react";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function Profile() {
  const [fullName, setFullName] = useState("Mr. Raja");
  const [email, setEmail] = useState("raja123@gmail.com");

  return (
    <div className="p-6 space-y-8 bg-white min-h-screen">
      {/* Header Section */}
      <HeaderTitle title="Setting" subtitle="Dashboard > Setting" />

      {/* Avatar & Action Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Profile Avatar"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
        </div>
        <Button className="bg-[#6A994E] hover:bg-[#5a8342] text-white flex items-center gap-2 h-11 px-6 font-semibold rounded-lg shadow-sm transition-all transform active:scale-95">
          <Pencil size={18} />
          Update Profile
        </Button>
      </div>

      {/* Form Section */}
      <div className="space-y-6 max-w-5xl">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-400">Full Name</Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary rounded-md bg-white text-gray-900 font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-400">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-gray-200 focus-visible:ring-primary/20 focus-visible:border-primary rounded-md bg-white text-gray-900 font-medium"
          />
        </div>
      </div>
    </div>
  );
}
