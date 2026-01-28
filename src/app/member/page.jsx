import axios from "axios";
import { MembersClient } from "@/components/members-client";

async function getMembers() {
  try {
    const response = await axios.get(`${process.env.BACKEND_API_URL}/members`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

export default async function MembersPage() {
  const members = await getMembers();

  return <MembersClient members={members} />;
}
