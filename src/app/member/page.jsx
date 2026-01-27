import axios from "axios";
import { MembersClient } from "@/components/members-client";

async function getMembers() {
  try {
    const response = await axios.get("http://localhost:3000/members");
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
