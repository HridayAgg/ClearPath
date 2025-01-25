import React, { useState, useEffect } from 'react';
import { MapPin, Clock, AlertTriangle, Wind } from 'lucide-react';
import TrafficMap from './features/TrafficMap';
import { getAirQualityData } from '../lib/api';

const PublicView = () => {
  const [issueType, setIssueType] = useState('traffic');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [aqiData, setAqiData] = useState<any>(null);

  useEffect(() => {
    // Fetch air quality data on component mount
    const fetchAirQualityData = async () => {
      try {
        const data = await getAirQualityData();
        setAqiData(data);
      } catch (error) {
        console.error('Failed to fetch air quality data:', error);
      }
    };
    fetchAirQualityData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and reward points
    console.log({ issueType, location, description });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Public Information</h1>
        <p className="text-gray-600">Real-time city updates and alerts for citizens</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Traffic Status */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Traffic Status</h2>
            <div className="h-[400px]">
              <TrafficMap />
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Alerts</h2>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-orange-800">Heavy Traffic Alert</h3>
                </div>
                <p className="mt-2 text-sm text-orange-700">
                  Expect delays on Main Street due to road maintenance
                </p>
                <div className="mt-2 text-sm text-orange-600">
                  Alternative Routes:
                  <ul className="list-disc list-inside mt-1">
                    <li>Use 5th Avenue bypass</li>
                    <li>Consider public transport</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-red-500" />
                  <h3 className="font-medium text-red-800">Poor Air Quality Warning</h3>
                </div>
                <p className="mt-2 text-sm text-red-700">
                  High pollution levels in Industrial District
                </p>
                <div className="mt-2 text-sm text-red-600">
                  Recommendations:
                  <ul className="list-disc list-inside mt-1">
                    <li>Wear N95 masks</li>
                    <li>Limit outdoor activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report an Issue */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Report an Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="traffic">Traffic Congestion</option>
                <option value="construction">Construction</option>
                <option value="pothole">Pothole</option>
                <option value="streetlight">Faulty Street Light</option>
                <option value="dumping">Illegal Dumping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <MapPin className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Enter location or address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Describe the issue..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Submit Report (+50 points)
            </button>
          </form>
        </div>

        {/* Air Quality Index */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Air Quality Index</h2>
          {aqiData ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100">
                  <span className="text-3xl font-bold text-green-700">
                    {aqiData.list[0].main.aqi * 50}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-green-700">Good</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">PM2.5</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {aqiData.list[0].components.pm2_5} µg/m³
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">PM10</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {aqiData.list[0].components.pm10} µg/m³
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">NO2</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {aqiData.list[0].components.no2} ppb
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">O3</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {aqiData.list[0].components.o3} ppb
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading air quality data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicView;