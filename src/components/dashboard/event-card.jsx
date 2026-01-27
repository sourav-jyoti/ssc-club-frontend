import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function EventCard({
  title,
  project,
  date,
  location,
  participants,
  prize,
  tags,
}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-4">{project}</p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-red-500" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm mt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{participants} participants</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span>{prize}</span>
            </div>
          </div>
        </div>

        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          Register
        </Button>
      </div>
    </div>
  );
}
