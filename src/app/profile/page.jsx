"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect admins to admin page
    if (status === "authenticated" && session?.user?.role === "PARTICIPANT") {
      router.push("/profile");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>

          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {session.user.name}
              </p>
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Role:</strong> {session.user.role}
              </p>
              <p>
                <strong>User ID:</strong> {session.user.id}
              </p>
              <p>
                <strong>Profile ID:</strong> {session.user.profileId}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <p className="text-gray-600 mb-4">
              Welcome to your profile page. Manage your account settings and
              preferences here.
            </p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
