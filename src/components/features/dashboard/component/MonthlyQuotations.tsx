"use client";

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MonthlyQuotations() {
  const { data: qData, isLoading } = useMonthlyQuotations();

  //   console.log(qData);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-[450px] w-full mt-4" />
      </div>
    );
  }

  // Assuming API returns { success: true, data: [ { month: 'Jan', count: 10 }, ... ] }
  // Mapping 'count' to 'value' for the chart if needed, or using it directly
  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData =
    qData?.data?.map((item: MonthlyQuotation) => ({
      ...item,
      monthName: monthNames[item.month] || `Month ${item.month}`,
      displayLabel: `${monthNames[item.month]} ${item.year}`,
    })) || [];

  return (
    <div className="bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/60 p-10">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="text-[26px] font-bold text-gray-800 tracking-tight">
            Quotation Overview
          </h2>
          <p className="text-[15px] font-medium text-gray-400 mt-1">
            Detailed Breakdown of Proposed Charges
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50/50 transition-all shadow-sm">
            Monthly
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-gray-100"
          >
            <DropdownMenuItem>Daily</DropdownMenuItem>
            <DropdownMenuItem>Weekly</DropdownMenuItem>
            <DropdownMenuItem>Monthly</DropdownMenuItem>
            <DropdownMenuItem>Yearly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[450px] w-full mt-2">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 30, right: 20, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7DA453" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#7DA453" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="#F1F3F5"
                strokeDasharray="0"
              />
              <XAxis
                dataKey="monthName"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 500 }}
                height={50}
                dy={30}
              />
              <YAxis hide={true} domain={["dataMin - 50", "dataMax + 100"]} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#FEE2E2",
                  strokeWidth: 1.5,
                  strokeDasharray: "0",
                }}
                allowEscapeViewBox={{ x: true, y: true }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6B9145"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
                activeDot={{
                  r: 6,
                  fill: "#1E3A5F",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No quotation data available for the selected period.
          </div>
        )}
      </div>
    </div>
  );
}

import { useMonthlyQuotations } from "../hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { MonthlyQuotation } from "../api/dashboard.api";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: MonthlyQuotation & { displayLabel: string; monthName: string };
    value: number;
    name: string;
  }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="relative group">
        <div className="bg-white py-4 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100/50 rounded-[12px] min-w-[140px] flex flex-col items-center justify-center mb-4">
          <p className="text-[12px] font-semibold text-gray-400 tracking-wide uppercase mb-1">
            {data.displayLabel}
          </p>
          <p className="text-[22px] font-bold text-[#1E3A5F] leading-none">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
        {/* Pointer on chart is handled by activeDot, this vertical line is the cursor */}
      </div>
    );
  }
  return null;
};
