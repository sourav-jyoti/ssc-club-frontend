"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, Shield, Settings, ChevronRight } from "lucide-react";
import { EditRoleModal } from "./edit-role-modal";

const roleColors = {
  Admin: "bg-red-100 text-red-600 border-red-200",
  Organizer: "bg-teal-100 text-teal-600 border-teal-200",
  Coordinator: "bg-blue-100 text-blue-600 border-blue-200",
  Volunteer: "bg-yellow-100 text-yellow-600 border-yellow-200",
  Member: "bg-purple-100 text-purple-600 border-purple-200",
};

const roleIcons = {
  Admin: Shield,
  Organizer: Settings,
  Coordinator: Users,
  Volunteer: Users,
  Member: Users,
};

export function RolesClient({ members: membersProp }) {
  // Ensure members is always an array
  const members = Array.isArray(membersProp) ? membersProp : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalUsers = members.length;
    const admins = members.filter((m) => m.role === "Admin").length;
    const organizers = members.filter((m) => m.role === "Organizer").length;

    return { totalUsers, admins, organizers };
  }, [members]);

  // Get unique roles
  const roles = useMemo(() => {
    const uniqueRoles = [...new Set(members.map((m) => m.role))];
    return ["all", ...uniqueRoles];
  }, [members]);

  // Filter members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        !searchQuery ||
        member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, searchQuery, roleFilter]);

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white shadow-sm border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.totalUsers}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Admins</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.admins}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <Settings className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Organizers</p>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.organizers}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role === "all" ? "All Roles" : role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredMembers.length === 0 ? (
          <Card className="p-8 text-center bg-white">
            <p className="text-gray-500">No members found</p>
          </Card>
        ) : (
          filteredMembers.map((member) => (
            <Card
              key={member._id || member.id}
              className="p-4 bg-white shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={member.profileImage?.url || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs ${roleColors[member.role] || roleColors.Member}`}
                      >
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Edit Role Modal */}
      {selectedMember && (
        <EditRoleModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          member={selectedMember}
        />
      )}
    </div>
  );
}
