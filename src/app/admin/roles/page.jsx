import axios from "axios";
import { RolesClient } from "@/components/admin/roles-client";

async function getMembers() {
  try {
    const response = await axios.get(`${process.env.BACKEND_API_URL}/members`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
  }
}

export default async function RolesPage() {
  const members = await getMembers();

  return <RolesClient members={members} />;
}
