"use client";
import { Calendar } from "@/components/ui/calendar";

export function EventCalendar({ selectedDate, onDateSelect }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Event Calendar
      </h3>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md"
      />
    </div>
  );
}
