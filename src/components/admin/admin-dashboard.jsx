"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  UserPlus,
  Shield,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import { CreateEventModal } from "./create-event-modal";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function AdminDashboard({ events = [], members = [] }) {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const router = useRouter();

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEvents = events.length;
    const activeMembers = members.filter((m) => m.status === "Active").length;
    const totalMembers = members.length;

    // Get recent members (last 5)
    const recentMembers = [...members]
      .sort((a, b) => {
        const dateA = new Date(a.joinedDate || a.createdAt || 0);
        const dateB = new Date(b.joinedDate || b.createdAt || 0);
        return dateB - dateA;
      })
      .slice(0, 5);

    // Get upcoming events
    const now = new Date();
    const upcomingEvents = events
      .filter((e) => new Date(e.startDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, 3);

    return {
      totalEvents,
      activeMembers,
      totalMembers,
      recentMembers,
      upcomingEvents,
    };
  }, [events, members]);

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your events and members
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Events */}
        <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Events
                </p>
                <p className="text-4xl font-bold mt-2">{stats.totalEvents}</p>
                <div className="flex items-center gap-1 mt-2 text-blue-100 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Active & Upcoming</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Members */}
        <Card className="border-0 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Active Members
                </p>
                <p className="text-4xl font-bold mt-2">{stats.activeMembers}</p>
                <div className="flex items-center gap-1 mt-2 text-green-100 text-sm">
                  <Users className="w-4 h-4" />
                  <span>of {stats.totalMembers} total</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Members */}
        <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  New Members
                </p>
                <p className="text-4xl font-bold mt-2">
                  {stats.recentMembers.length}
                </p>
                <div className="flex items-center gap-1 mt-2 text-purple-100 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>This week</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <UserPlus className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() => setIsCreateEventModalOpen(true)}
              className="h-auto py-4 flex-col gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Create Event</span>
            </Button>
            <Button
              onClick={() => router.push("/admin/roles")}
              className="h-auto py-4 flex-col gap-2 bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Manage Roles</span>
            </Button>
            <Button
              onClick={() => router.push("/admin/events")}
              className="h-auto py-4 flex-col gap-2 bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">View Events</span>
            </Button>
            <Button
              onClick={() => router.push("/member")}
              className="h-auto py-4 flex-col gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">View Members</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <Card className="border-0 bg-white shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Members
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin/roles")}
                className="text-blue-500 hover:text-blue-600"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {stats.recentMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No recent members
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentMembers.map((member) => (
                  <div
                    key={member._id || member.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={member.profileImage?.url || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {member.email}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-600 border-blue-200"
                    >
                      {member.role || "Member"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 bg-white shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Upcoming Events
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin/events")}
                className="text-blue-500 hover:text-blue-600"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {stats.upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No upcoming events
              </div>
            ) : (
              <div className="space-y-3">
                {stats.upcomingEvents.map((event) => (
                  <div
                    key={event._id || event.id}
                    className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(event.startDate)}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs bg-teal-50 text-teal-600 border-teal-200 shrink-0"
                      >
                        {event.category || "Event"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        onEventCreated={() => {
          // Optionally refresh the page or update state
          window.location.reload();
        }}
      />
    </div>
  );
}
