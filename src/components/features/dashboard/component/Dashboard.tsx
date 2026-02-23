import React from "react";
import Stats from "./Stats";
import MonthlyQuotations from "./MonthlyQuotations";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Stats />
      <MonthlyQuotations />
    </div>
  );
}
