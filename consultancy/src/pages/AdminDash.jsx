import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const DashboardCard = ({ icon: Icon, title, value }) => (
  <Card className="w-full md:w-1/4 p-4 shadow-xl">
    <CardContent className="flex flex-col items-center justify-center text-center">
      <Icon className="h-8 w-8 text-blue-600 mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </CardContent>
  </Card>
);

export default function SchoolAdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">School Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={Users} title="Students" value="1,200" />
        <DashboardCard icon={BookOpen} title="Courses" value="36" />
        <DashboardCard icon={CalendarDays} title="Events" value="12" />
        <DashboardCard icon={BarChart3} title="Performance" value="89%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-2">
              <li className="border-b pb-2">Science Fair - April 10</li>
              <li className="border-b pb-2">Parent-Teacher Meeting - April 15</li>
              <li className="border-b pb-2">Sports Day - April 25</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-4 shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-3">
              <Button>Add New Student</Button>
              <Button variant="outline">Create Event</Button>
              <Button variant="ghost">Generate Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
