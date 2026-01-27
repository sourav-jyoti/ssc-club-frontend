"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Shield, Calendar, MapPin } from "lucide-react";

const roleColors = {
  Admin: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  Organizer: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  Coordinator: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  Volunteer: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Member: "bg-chart-5/15 text-chart-5 border-chart-5/30",
};

const statusColors = {
  Active: "bg-chart-1/15 text-chart-1",
  Pending: "bg-chart-3/15 text-chart-3",
  Inactive: "bg-muted text-muted-foreground",
};

export function MemberCard({ member, viewMode = "grid" }) {
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (viewMode === "list") {
    return (
      <Card className="border-0 bg-card shadow-md hover:shadow-lg transition-all p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 shadow-sm shrink-0">
            <AvatarImage src={member.profileImage?.url || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {member.name}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs ${roleColors[member.role] || roleColors.Member}`}
              >
                {member.role}
              </Badge>
              <Badge
                className={`text-xs ${statusColors[member.status] || statusColors.Pending}`}
              >
                {member.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 truncate">
                <Mail className="w-3 h-3" />
                {member.email}
              </span>
              {member.phone && (
                <span className="flex items-center gap-1 hidden sm:flex">
                  <Phone className="w-3 h-3" />
                  {member.phone}
                </span>
              )}
              {member.joinedDate && (
                <span className="flex items-center gap-1 hidden md:flex">
                  <Calendar className="w-3 h-3" />
                  Joined {new Date(member.joinedDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-card shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group">
      {/* Header with Avatar */}
      <div className="relative h-24 bg-gradient-to-br from-primary/20 via-accent/10 to-chart-2/20">
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <Avatar className="h-16 w-16 border-4 border-card shadow-lg">
            <AvatarImage src={member.profileImage?.url || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-4 px-4 text-center">
        <h3 className="font-semibold text-foreground truncate mb-1">
          {member.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-3">
          {member.email}
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge
            variant="outline"
            className={`text-xs ${roleColors[member.role] || roleColors.Member}`}
          >
            <Shield className="w-3 h-3 mr-1" />
            {member.role}
          </Badge>
          <Badge
            className={`text-xs ${statusColors[member.status] || statusColors.Pending}`}
          >
            {member.status}
          </Badge>
        </div>

        {member.phone && (
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-2">
            <Phone className="w-3 h-3" />
            {member.phone}
          </p>
        )}

        {member.department && (
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" />
            {member.department}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 px-4 py-3 bg-secondary/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Events: {member.eventsAttended || 0}</span>
          {member.joinedDate && (
            <span>
              Joined{" "}
              {new Date(member.joinedDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
