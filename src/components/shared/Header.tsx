"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import HeaderTitle from "../Dashboard/ReusableComponents/HeaderTitle";

interface UserWithNames {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
}

export default function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const user = session?.user as UserWithNames;
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const email = user?.email || "";

  // Extract first word of first name and last word of last name
  const displayFirstName = firstName.split(" ")[0] || "";
  const displayLastName = lastName.split(" ").pop() || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const userInitials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : email.slice(0, 2).toUpperCase() || "??";

  const handleLogout = () => {
    signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4 p-5 bg-white rounded-md border-b">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <header className="w-full h-[100px] bg-white shadow-sm border-b px-8 py-3 flex items-center justify-between">
      {/* Left: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md border hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <HeaderTitle title="Overview" subtitle="See your updates today!" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-primary">
            {displayFirstName} {displayLastName}
          </p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border-2 border-primary/10 hover:border-primary/30 transition-all">
              <AvatarImage src={user?.image || ""} alt={fullName} />
              <AvatarFallback className="bg-primary/5 text-primary font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{fullName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
