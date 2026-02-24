import React from "react";
import Stats from "./Stats";
import MonthlyQuotations from "./MonthlyQuotations";
import NewContactMessage from "./NewContactMessage";
import RecentPastProjects from "./RecentPastProjects";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Stats />
      <MonthlyQuotations />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewContactMessage />
        <RecentPastProjects />
      </div>  
    </div>
  );
}
