import axios from "axios";
import { RolesClient } from "@/components/admin/roles-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getMembers() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No session found");
    return [];
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${session.user.backendToken}`,
        },
      },
    );

    console.log("API Response:", response.data);

    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data?.users && Array.isArray(response.data.users)) {
      return response.data.users;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    console.warn("Unexpected API response structure:", response.data);
    return [];
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

export default async function RolesPage() {
  const members = await getMembers();

  return <RolesClient members={members} />;
}
