import React from 'react';
import { User, Award, Clock, MapPin } from 'lucide-react';

// Interface for activity data
interface Activity {
  type: string;
  description: string;
  points: number;
  time: string;
}

const UserProfile = () => {
  // Fetch submissions from localStorage
  const submissions: Activity[] = JSON.parse(localStorage.getItem('submissions') || '[]');

  // Sort activities by time (most recent first) and limit to 3
  const recentActivities = submissions
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()) // Sort by time (descending)
    .slice(0, 3); // Limit to 3 activities

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* User Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600">Active Member since January 2024</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Total Points</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">1,250</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Reports Made</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">25</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Rewards Claimed</span>
              </div>
              <p className="text-2xl font-bold text-green-700">8</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <p className="text-gray-600">No recent activity.</p>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{activity.type}</div>
                        <div className="text-sm text-gray-600">{activity.description}</div>
                        <div className="text-sm text-gray-500">{activity.time}</div>
                      </div>
                      <div
                        className={`font-medium ${
                          activity.points > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {activity.points > 0 ? '+' : ''}
                        {activity.points} points
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Available Rewards Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'City Cafe Discount',
                    cost: 200,
                    description: '20% off on your next purchase',
                  },
                  {
                    title: 'Bus Pass',
                    cost: 500,
                    description: 'Free 1-day bus pass',
                  },
                ].map((reward, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                    <button className="w-full mt-2 bg-purple-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-700 transition-colors">
                      Claim for {reward.cost} points
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;