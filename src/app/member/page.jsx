import axios from "axios";
import { MembersClient } from "@/components/members-client";

async function getMembers() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`,
    );
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
