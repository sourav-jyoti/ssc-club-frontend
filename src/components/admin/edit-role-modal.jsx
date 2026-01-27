"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";

const roles = ["Admin", "Organizer", "Coordinator", "Volunteer", "Member"];

const permissions = [
  {
    id: "create_events",
    label: "Create Events",
    description: "Can create new events",
  },
  {
    id: "edit_events",
    label: "Edit Events",
    description: "Can modify existing events",
  },
  {
    id: "delete_events",
    label: "Delete Events",
    description: "Can remove old events",
  },
  {
    id: "manage_members",
    label: "Manage Members",
    description: "Can add/remove members",
  },
  {
    id: "manage_roles",
    label: "Manage Roles",
    description: "Can assign roles to users",
  },
  {
    id: "view_analytics",
    label: "View Analytics",
    description: "Access to analytics",
  },
  {
    id: "manage_registrations",
    label: "Manage Registrations",
    description: "Handle event registrations",
  },
  {
    id: "send_notifications",
    label: "Send Notifications",
    description: "Can send announcements",
  },
  {
    id: "manage_settings",
    label: "Manage Settings",
    description: "Access system settings",
  },
  {
    id: "export_data",
    label: "Export Data",
    description: "Can export reports and data",
  },
];

export function EditRoleModal({ isOpen, onClose, member }) {
  const [selectedRole, setSelectedRole] = useState(member.role || "Member");
  const [designation, setDesignation] = useState(member.designation || "");
  const [selectedPermissions, setSelectedPermissions] = useState(
    member.permissions || [],
  );

  if (!isOpen) return null;

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId],
    );
  };

  const handleSave = () => {
    // TODO: Implement API call to update member role and permissions
    console.log({
      memberId: member._id || member.id,
      role: selectedRole,
      designation,
      permissions: selectedPermissions,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Role & Permissions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Member Info */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={member.profileImage?.url || "/placeholder.svg"}
                />
                <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-blue-500/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="h-5 w-5 text-white" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
            <p className="text-xs text-gray-400">
              Use track camera to capture user's photo or select from gallery.
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </Label>
            <div className="flex gap-2 flex-wrap">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedRole === role
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <Label
              htmlFor="designation"
              className="text-sm font-medium text-gray-700"
            >
              Designation / Position
            </Label>
            <Input
              id="designation"
              placeholder="e.g. Event Coordinator, Technical Lead"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="bg-white border-gray-300"
            />
          </div>

          {/* Permissions */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Permissions
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {permissions.map((permission) => (
                <button
                  key={permission.id}
                  onClick={() => togglePermission(permission.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedPermissions.includes(permission.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {permission.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
