import axios from "axios";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

async function getAdminData() {
  try {
    const [eventsRes, membersRes] = await Promise.all([
      axios.get(`${process.env.BACKEND_API_URL}/event`),
      axios.get(`${process.env.BACKEND_API_URL}/members`),
    ]);

    return {
      events: eventsRes.data?.events || [],
      members: membersRes.data || [],
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
