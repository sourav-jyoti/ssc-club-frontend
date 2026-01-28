import React from "react";
import { TrendingUp } from "lucide-react";

function StatCard({ title, value, subtitle, icon, iconBg, subtitleColor }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <p className="text-xs text-gray-500 mb-3">{title}</p>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-xs flex items-center gap-1 ${subtitleColor}`}>
            <TrendingUp className="w-3 h-3" />
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StatsCards({ totalEvents, totalStudents, totalCertificates }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        title="Total Events Concluded"
        value={totalEvents}
        subtitle="21 this month"
        icon={
          <svg
            className="w-5 h-5 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        }
        iconBg="bg-orange-50"
        subtitleColor="text-orange-500"
      />
      <StatCard
        title="Total Students Participated"
        value={totalStudents}
        subtitle="300 this month"
        icon={
          <svg
            className="w-5 h-5 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
        iconBg="bg-blue-50"
        subtitleColor="text-blue-500"
      />
      <StatCard
        title="Certificates Issued"
        value={totalCertificates}
        subtitle="92% success rate"
        icon={
          <svg
            className="w-5 h-5 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        }
        iconBg="bg-green-50"
        subtitleColor="text-green-500"
      />
    </div>
  );
}
