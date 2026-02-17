"use client";

import React, { useState, useEffect, useMemo } from "react";

export default function PastProjects() {
  // Stable target date (5 days from first render)
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  }, []);

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center my-20 bg-[#faf8f6] text-center space-y-6">
      <h1 className="text-3xl font-semibold">🚧 Page Under Development</h1>

      <p className="text-gray-600">
        This page is currently working and will be available soon.
      </p>

      {/* Countdown */}
      <div className="flex gap-8 text-xl font-medium">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="bg-white shadow-md rounded-xl px-6 py-4">
            <p className="text-3xl font-bold">{value}</p>
            <span className="text-sm text-gray-500 capitalize">{key}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400">Coming Soon...</p>
    </div>
  );
}
