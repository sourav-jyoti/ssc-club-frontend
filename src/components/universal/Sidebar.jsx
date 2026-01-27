"use client";

import {
  Home,
  User,
  LogOut,
  Shield,
  Calendar,
  Users2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;
  const [adminExpanded, setAdminExpanded] = useState(true);

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/dashboard",
      roles: ["PUBLIC", "ADMIN", "PARTICIPANT", "MEMBER"],
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/profile",
      roles: ["PARTICIPANT"],
    },
    {
      id: "member",
      label: "Member",
      icon: User,
      href: "/member",
      roles: ["PUBLIC", "ADMIN", "PARTICIPANT", "MEMBER"],
    },
    {
      id: "admin",
      label: "Admin",
      icon: Shield,
      href: "/admin",
      roles: ["ADMIN"],
      subItems: [
        {
          id: "events",
          label: "Events",
          icon: Calendar,
          href: "/admin/events",
        },
        {
          id: "roles",
          label: "Roles",
          icon: Users2,
          href: "/admin/roles",
        },
      ],
    },
  ];

  const visibleItems = navItems.filter((item) =>
    !role ? item.roles.includes("PUBLIC") : item.roles.includes(role),
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-[200px] bg-[#0f172a] flex flex-col text-white z-50">
      <div className="p-6 flex items-center gap-2">
        <span className="text-xl font-semibold">Logo</span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isParentActive =
            hasSubItems && item.subItems.some((sub) => pathname === sub.href);

          return (
            <div key={item.id}>
              {hasSubItems ? (
                <>
                  <button
                    onClick={() => setAdminExpanded(!adminExpanded)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-lg mb-1 transition-colors",
                      isActive || isParentActive
                        ? "bg-[#1e3a5f] text-white"
                        : "text-gray-400 hover:bg-[#1e293b] hover:text-white",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        adminExpanded ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  {adminExpanded && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                              isSubActive
                                ? "bg-[#1e3a5f] text-white"
                                : "text-gray-400 hover:bg-[#1e293b] hover:text-white",
                            )}
                          >
                            <SubIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {subItem.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                    isActive
                      ? "bg-[#1e3a5f] text-white"
                      : "text-gray-400 hover:bg-[#1e293b] hover:text-white",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {session && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: "/dashboard" })}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}
