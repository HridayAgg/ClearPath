import React from 'react';
import { Settings, Users, AlertCircle } from 'lucide-react';

const AdminView = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage city infrastructure and monitor alerts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <Settings className="h-6 w-6 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Sensors Online</span>
              <span className="text-green-500 font-semibold">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Freshness</span>
              <span className="text-green-500 font-semibold">2 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Status</span>
              <span className="text-green-500 font-semibold">Operational</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Reports</h3>
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New Reports</span>
              <span className="text-blue-500 font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">In Progress</span>
              <span className="text-yellow-500 font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Resolved</span>
              <span className="text-green-500 font-semibold">24</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-md">
              <div className="text-sm font-medium text-red-800">High Traffic Alert</div>
              <div className="text-sm text-red-600">Downtown Area - 15 min ago</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-md">
              <div className="text-sm font-medium text-yellow-800">Air Quality Warning</div>
              <div className="text-sm text-yellow-600">Industrial Zone - 1 hour ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Settings className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    System Update Completed
                  </p>
                  <p className="text-sm text-gray-500">
                    Sensor network firmware updated successfully
                  </p>
                </div>
                <div className="text-sm text-gray-500">5m ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900">48%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Storage</span>
                <span className="text-sm font-medium text-gray-900">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;