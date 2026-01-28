import axios from "axios";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAdminData() {
  try {
    // Fetch events (no auth required) and session in parallel
    const [eventsRes, session] = await Promise.all([
      axios.get(`${process.env.EXT_PUBLIC_BACKEND_API_URL}/event`),
      getServerSession(authOptions),
    ]);

    // Fetch members with auth token
    let membersRes;
    if (session?.user?.backendToken) {
      membersRes = await axios.get(
        `${process.env.EXT_PUBLIC_BACKEND_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${session.user.backendToken}`,
          },
        },
      );
    }

    return {
      events: eventsRes.data?.events || [],
      members: membersRes?.data || [],
    };
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
    return {
      events: [],
      members: [],
    };
  }
}

export default async function AdminPage() {
  const data = await getAdminData();

  return <AdminDashboard events={data.events} members={data.members} />;
}
