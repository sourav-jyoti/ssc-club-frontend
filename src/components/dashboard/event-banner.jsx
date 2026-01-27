import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventBanner() {
  return (
    <div className="relative bg-gradient-to-r from-[#0f2744] to-[#1a3a5c] rounded-2xl p-6 overflow-hidden">
      <Button
        size="sm"
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-7"
      >
        View all +
      </Button>

      <div className="flex items-center justify-between">
        <div className="max-w-sm z-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Event Horizon 2025
          </h2>
          <p className="text-blue-300 text-lg mb-4">
            Innovate. Create. Connect.
          </p>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Join industry leaders and creative minds for a transformative
            experience in technology and design. Secure your spot now!
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Illustration area */}
          <div className="relative">
            {/* Calendar illustration */}
            <div className="w-32 h-28 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <div className="w-24 h-20 bg-white rounded-lg p-2">
                <div className="w-full h-3 bg-blue-500 rounded-t mb-1"></div>
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-200 rounded-sm"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Play button */}
            <button className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play
                className="w-5 h-5 text-blue-600 ml-1"
                fill="currentColor"
              />
            </button>
          </div>

          {/* Person illustration */}
          <div className="w-28 h-36 relative">
            <div className="absolute bottom-0 w-full">
              {/* Simple person silhouette */}
              <div className="relative">
                <div className="w-10 h-10 bg-orange-200 rounded-full mx-auto"></div>
                <div className="w-16 h-20 bg-teal-500 rounded-t-lg mx-auto mt-1"></div>
                <div className="w-20 h-8 bg-[#1a3a5c] mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
