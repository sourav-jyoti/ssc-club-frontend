import { EventCard } from "./event-card";

export function UpcomingEvents({ events = [] }) {
  if (!Array.isArray(events)) {
    console.log("UpcomingEvents expected array, got:", events);
    return null;
  }

  return (
    <div className="space-y-4">
      {events.map((e) => (
        <EventCard
          key={e.id}
          title={e.title}
          project={e.project}
          date={e.date}
          location={e.location}
          participants={e.participants}
          prize={e.prize}
          tags={e.tags}
        />
      ))}
    </div>
  );
}
