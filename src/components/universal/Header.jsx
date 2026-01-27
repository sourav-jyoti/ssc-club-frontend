"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search, Settings, Bell, Moon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AuthModal } from "@/components/auth-modal";

export default function Header() {
  const { data: session, status } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAvatarClick = () => {
    if (status === "authenticated") {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setShowUserMenu(false);
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              Search
            </span>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              className="w-full pl-16 pr-10 py-2 bg-gray-50 border-gray-200 rounded-lg text-sm"
              placeholder=""
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 pl-2 relative">
            <button onClick={handleAvatarClick}>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={session?.user?.image || "/placeholder-avatar.jpg"}
                  alt={session?.user?.name || "User"}
                />
                <AvatarFallback className="bg-orange-400 text-white text-xs">
                  {session?.user?.name
                    ? getUserInitials(session.user.name)
                    : "U"}
                </AvatarFallback>
              </Avatar>
            </button>
            {status === "authenticated" && (
              <>
                <span className="text-sm text-gray-700">
                  {session?.user?.name || "User"}
                </span>
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Role: {session.user.role}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
