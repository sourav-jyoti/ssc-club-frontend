"use client";

import { useEffect, useState } from "react";
import { EventBanner } from "@/components/dashboard/event-banner";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { EventCalendar } from "@/components/dashboard/event-calender";
import { EventList } from "@/components/dashboard/event-list";
import { UpcomingEvents } from "@/components/dashboard/upcomingEvents";
import axios from "axios";

const getTodayInIndianTimezone = () => {
  const now = new Date();
  const indianTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
  return indianTime;
};

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayInIndianTimezone());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" or "rank"

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const res = await axios.get(`${apiUrl}event`);
        setData(res.data?.events || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by selected date
  const filterEventsByDate = (events, date) => {
    if (!Array.isArray(events) || !date) return [];

    const selectedDateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD format

    return events.filter((event) => {
      if (!event.date) return false;

      // Parse event date (assuming it's in a format like "16 Sep 2025" or ISO format)
      const eventDate = new Date(event.date);
      const eventDateStr = eventDate.toISOString().split("T")[0];

      return eventDateStr === selectedDateStr;
    });
  };

  const filteredEvents = filterEventsByDate(data, selectedDate);
  const totalEvents = data.length;
  const Students = 16;
  const totalCertificates = 16;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex gap-6">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <EventBanner data={data} />

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Stats..</h2>
          <StatsCards
            totalEvents={totalEvents}
            totalStudents={Students}
            totalCertificates={totalCertificates}
          />
        </div>

        <div>
          {/* Tab Navigation */}
          <div className="flex items-center gap-8 mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-2 px-1 text-lg font-medium transition-colors relative ${
                activeTab === "upcoming"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Upcoming Events
              {activeTab === "upcoming" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("rank")}
              className={`pb-2 px-1 text-lg font-medium transition-colors relative ${
                activeTab === "rank"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Rank of Students
              {activeTab === "rank" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"></span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "upcoming" ? (
              <UpcomingEvents events={data} />
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center">
                <p className="text-gray-500 text-lg">Next update</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        <EventCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        <EventList events={filteredEvents} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
