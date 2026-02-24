"use client";

import Link from "next/link";

export default function Settings() {
  return (
    <div>
      <div className="w-full mx-auto container mt-10">
        <Link href="/settings/profile">
          <div className="border-2 border-gray-200 rounded-lg p-4 text-[16px] font-bold">
            Profile
          </div>
        </Link>
        <Link href="/settings/change-password">
          <div className="border-2 border-gray-200 rounded-lg p-4 mt-4 text-[16px] font-bold">
            Change Password
          </div>
        </Link>
      </div>
    </div>
  );
}
