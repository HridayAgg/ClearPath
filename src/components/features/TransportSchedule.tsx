import React from 'react';
import { Clock, Bus, Train } from 'lucide-react';
import type { TransportSchedule as Schedule } from '../../types';

const TransportSchedule: React.FC = () => {
  const schedules: Schedule[] = [
    {
      id: '1',
      type: 'bus',
      routeNumber: '101',
      startLocation: 'Central Station',
      endLocation: 'Airport',
      schedule: [
        {
          departureTime: '06:00',
          arrivalTime: '06:45',
          frequency: 15,
        },
        // Add more schedules
      ],
      status: 'on-time',
    },
    // Add more routes
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Transport Schedule</h2>
      </div>

      <div className="space-y-6">
        {schedules.map((route) => (
          <div
            key={route.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3 mb-3">
              {route.type === 'bus' ? (
                <Bus className="h-5 w-5 text-blue-500" />
              ) : (
                <Train className="h-5 w-5 text-green-500" />
              )}
              <h3 className="text-lg font-semibold">
                Route {route.routeNumber}: {route.startLocation} → {route.endLocation}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">First Departure</span>
                <p className="font-medium">{route.schedule[0].departureTime}</p>
              </div>
              <div>
                <span className="text-gray-600">Frequency</span>
                <p className="font-medium">Every {route.schedule[0].frequency} mins</p>
              </div>
              <div>
                <span className="text-gray-600">Status</span>
                <p className={`font-medium ${
                  route.status === 'on-time' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportSchedule;