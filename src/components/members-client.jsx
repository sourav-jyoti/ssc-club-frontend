"use client";
import { useState, useMemo } from "react";
import { MemberCard } from "@/components/member-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, Grid3X3, List, UserPlus } from "lucide-react";

export function MembersClient({ members = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Extract unique roles and statuses from members
  const roles = useMemo(() => {
    const uniqueRoles = [...new Set(members.map((m) => m.role))];
    return ["all", ...uniqueRoles];
  }, [members]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(members.map((m) => m.status))];
    return ["all", ...uniqueStatuses];
  }, [members]);

  // Filter members based on search and filters
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        !searchQuery ||
        member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, searchQuery, roleFilter, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: members.length,
      active: members.filter((m) => m.status === "Active").length,
      pending: members.filter((m) => m.status === "Pending").length,
    };
  }, [members]);

  return (
    <div className="flex min-h-screen bg-background">
      <main className="p-4 lg:p-6 space-y-6 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-card rounded-xl p-4 shadow-md border-0">
            <p className="text-xs lg:text-sm text-muted-foreground">
              Total Members
            </p>
            <p className="text-xl lg:text-2xl font-bold text-foreground mt-1">
              {stats.total}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md border-0">
            <p className="text-xs lg:text-sm text-muted-foreground">Active</p>
            <p className="text-xl lg:text-2xl font-bold text-chart-1 mt-1">
              {stats.active}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md border-0">
            <p className="text-xs lg:text-sm text-muted-foreground">Pending</p>
            <p className="text-xl lg:text-2xl font-bold text-chart-3 mt-1">
              {stats.pending}
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32 lg:w-36 bg-card shadow-sm">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 lg:w-32 bg-card shadow-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex bg-card rounded-lg p-1 shadow-sm border border-border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-8 w-8"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Members Grid/List */}
        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No members found
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              {searchQuery || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first team member"}
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
                : "flex flex-col gap-3"
            }
          >
            {filteredMembers.map((member) => (
              <MemberCard
                key={member._id || member.id}
                member={member}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
