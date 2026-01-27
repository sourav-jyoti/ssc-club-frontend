"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Calendar,
  MapPin,
  Users,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
} from "lucide-react";
import { CreateEventModal } from "./create-event-modal";
import { format } from "date-fns";

const categoryColors = {
  conference: "bg-teal-100 text-teal-700 border-teal-200",
  workshop: "bg-blue-100 text-blue-700 border-blue-200",
  meetup: "bg-orange-100 text-orange-700 border-orange-200",
  seminar: "bg-purple-100 text-purple-700 border-purple-200",
  concert: "bg-pink-100 text-pink-700 border-pink-200",
  sports: "bg-green-100 text-green-700 border-green-200",
  tech: "bg-indigo-100 text-indigo-700 border-indigo-200",
  other: "bg-gray-100 text-gray-700 border-gray-200",
};

const categoryGradients = {
  conference: "from-teal-400 to-teal-600",
  workshop: "from-blue-400 to-blue-600",
  meetup: "from-orange-400 to-orange-600",
  seminar: "from-purple-400 to-purple-600",
  concert: "from-pink-400 to-pink-600",
  sports: "from-green-400 to-green-600",
  tech: "from-indigo-400 to-indigo-600",
  other: "from-gray-400 to-gray-600",
};

export function EventsClient({ initialEvents = [] }) {
  const [events, setEvents] = useState(
    Array.isArray(initialEvents) ? initialEvents : [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(events.map((e) => e.category?.toLowerCase() || "other")),
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      !searchQuery ||
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase());

    const eventCategory = event.category?.toLowerCase() || "other";
    const matchesCategory =
      categoryFilter === "all" || eventCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const formatEventDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500">
            Manage and organize all your events
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200"
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all"
                    ? "All"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex bg-white rounded-lg border border-gray-200">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-10 w-10"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-10 w-10"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Events Grid/List */}
      {filteredEvents.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              No events found
            </h3>
            <p className="text-sm text-gray-500 max-w-md">
              {searchQuery || categoryFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first event"}
            </p>
            {!searchQuery && categoryFilter === "all" && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-2 bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredEvents.map((event) => {
            const category = event.category?.toLowerCase() || "other";
            return (
              <Card
                key={event._id || event.id}
                className="overflow-hidden bg-white shadow-sm border-0 hover:shadow-lg transition-shadow"
              >
                {/* Event Image/Gradient Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${categoryGradients[category] || categoryGradients.other} relative`}
                >
                  <Badge
                    variant="outline"
                    className={`absolute top-3 left-3 ${categoryColors[category] || categoryColors.other} border`}
                  >
                    {event.category || "Other"}
                  </Badge>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <MoreVertical className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Event Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatEventDate(event.startDate)}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    )}
                    {event.registration && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>
                          {event.registeredCount || 0} /{" "}
                          {event.maxParticipants || "∞"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
}
