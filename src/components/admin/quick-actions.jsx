import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus, Shield } from "lucide-react";

const actions = [
  {
    name: "Create Event",
    icon: Plus,
    color: "bg-chart-1 hover:bg-chart-1/90 shadow-chart-1/25",
  },
  {
    name: "Add Member",
    icon: UserPlus,
    color: "bg-chart-2 hover:bg-chart-2/90 shadow-chart-2/25",
  },
  {
    name: "Manage Roles",
    icon: Shield,
    color: "bg-chart-3 hover:bg-chart-3/90 shadow-chart-3/25",
  },
];

export function QuickActions() {
  return (
    <Card className="border-0 bg-card shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 px-4 lg:px-6">
        <CardTitle className="text-sm lg:text-base font-semibold text-card-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 lg:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-3">
          {actions.map((action) => (
            <Button
              key={action.name}
              className={`h-auto py-3 lg:py-4 flex-col gap-1.5 lg:gap-2 ${action.color} text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <action.icon className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="text-[10px] lg:text-xs font-medium text-center leading-tight">
                {action.name}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
