import axios from "axios";
import { EventsClient } from "@/components/admin/events-client";

async function getEvents() {
  try {
    const response = await axios.get("http://localhost:3000/event");
    // API returns { success, count, events: [...] }
    return response.data?.events || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return <EventsClient initialEvents={events} />;
}
