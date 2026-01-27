import { Check } from "lucide-react";
import { format } from "date-fns";

export function EventList({ events, selectedDate }) {
  if (!Array.isArray(events)) {
    console.log("EventList expected array, got:", events);
    return null;
  }

  const formattedDate = selectedDate
    ? format(selectedDate, "d MMM yyyy")
    : "Select a date";

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">
        Events on {formattedDate}
      </h3>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">
          No events scheduled for this date
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  event.isCompleted
                    ? "bg-teal-500"
                    : event.color || "bg-blue-500"
                }`}
              >
                {event.isCompleted ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500">{event.time || "TBD"}</p>
              </div>

              <div className="text-right">
                {event.isToday ? (
                  <span className="text-xs bg-teal-50 text-teal-600 px-2 py-1 rounded">
                    Today
                  </span>
                ) : (
                  <div>
                    <p className="text-xs text-pink-500">{event.date}</p>
                    {event.dateTime && (
                      <p className="text-xs text-pink-500">{event.dateTime}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
